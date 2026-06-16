import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import {
  Button,
  Card,
  Field,
  Input,
  Textarea,
  SectionTitle,
  Tag,
} from "../design-system";
import {
  contestApi,
  type ContestConfig,
  type Registration,
  type Submission,
} from "../utils/contestApi";
import { normalizeApiError, type FieldErrors } from "../utils/formErrors";

const ACCEPTED = ".pdf,.doc,.docx,.ppt,.pptx,.zip";
const MAX_BYTES = 20480 * 1024; // 20 MB, per contest.submission_file.max_kilobytes

const SubmitPage = () => {
  const [contest, setContest] = useState<ContestConfig | null>(null);

  const [code, setCode] = useState("");
  const [lookupError, setLookupError] = useState("");
  const [lookingUp, setLookingUp] = useState(false);
  const [registration, setRegistration] = useState<Registration | null>(null);

  const [workTitle, setWorkTitle] = useState("");
  const [workSummary, setWorkSummary] = useState("");
  const [strategy, setStrategy] = useState("");
  const [file, setFile] = useState<File | null>(null);

  const [errors, setErrors] = useState<FieldErrors>({});
  const [formError, setFormError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [result, setResult] = useState<Submission | null>(null);

  useEffect(() => {
    contestApi.getContest().then(setContest).catch(() => undefined);
  }, []);

  const awardName = (key?: string) =>
    contest?.awards.find((a) => a.key === key)?.name ?? key ?? "";

  const lookup = async (e: React.FormEvent) => {
    e.preventDefault();
    setLookupError("");
    if (!code.trim()) {
      setLookupError("請輸入報名編號。");
      return;
    }
    setLookingUp(true);
    try {
      const reg = await contestApi.getRegistration(code.trim());
      setRegistration(reg);
      // Prefill from an existing submission so teams can update their entry.
      if (reg.submission) {
        setWorkTitle(reg.submission.work_title ?? "");
        setWorkSummary(reg.submission.work_summary ?? "");
        setStrategy(reg.submission.strategy_statement ?? "");
      }
    } catch (err) {
      const normalized = normalizeApiError(err);
      setRegistration(null);
      setLookupError(
        normalized.message.includes("找") || normalized.fields
          ? "查無此報名編號，請確認後再試。"
          : normalized.message,
      );
    } finally {
      setLookingUp(false);
    }
  };

  const validate = (): FieldErrors => {
    const next: FieldErrors = {};
    if (!workTitle.trim()) next.work_title = "請填寫作品名稱。";
    if (!workSummary.trim()) next.work_summary = "請填寫作品摘要。";
    if (file && file.size > MAX_BYTES)
      next.work_file = "檔案大小不可超過 20MB。";
    return next;
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!registration) return;
    setFormError("");
    const clientErrors = validate();
    if (Object.keys(clientErrors).length) {
      setErrors(clientErrors);
      setFormError("請修正表單中標示的欄位後再送出。");
      return;
    }
    setErrors({});
    setSubmitting(true);
    try {
      const submission = await contestApi.submitWork({
        registration_code: registration.registration_code,
        work_title: workTitle.trim(),
        work_summary: workSummary.trim(),
        strategy_statement: strategy.trim() || undefined,
        work_file: file ?? undefined,
      });
      setResult(submission);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (err) {
      const normalized = normalizeApiError(err);
      setErrors(normalized.fields);
      setFormError(normalized.message);
    } finally {
      setSubmitting(false);
    }
  };

  if (result) {
    return <SuccessPanel submission={result} />;
  }

  const alreadySubmitted = !!registration?.submission;

  return (
    <main className="relative min-h-screen w-full overflow-hidden bg-section-mint px-6 pb-32 pt-[150px] max-[768px]:pt-[120px]">
      <div className="grid-bg-blue pointer-events-none absolute inset-0 opacity-25" />
      <div className="relative z-10 mx-auto flex w-full max-w-[820px] flex-col">
        <SectionTitle color="brand" size="lg" className="mb-4 max-[768px]:text-display-sm">
          交件專區
        </SectionTitle>
        <p className="mb-10 max-w-[640px] font-bold leading-[160%] text-ink">
          請輸入報名時取得的「報名編號」查詢團隊資料，接著上傳你的參賽作品。
          {contest && (
            <>
              （交件期間 {contest.submission_period.starts_at} ～{" "}
              {contest.submission_period.ends_at}）
            </>
          )}
        </p>

        {/* Step 1 — lookup */}
        <Card className="mb-8 gap-5">
          <h2 className="text-2xl font-bold text-ink">① 查詢報名資料</h2>
          <form onSubmit={lookup} className="flex items-end gap-4 max-[640px]:flex-col max-[640px]:items-stretch">
            <Field
              label="報名編號"
              htmlFor="registration_code"
              className="flex-1"
              error={lookupError}
            >
              <Input
                id="registration_code"
                value={code}
                onChange={(e) => setCode(e.target.value.toUpperCase())}
                placeholder="例如 FSN-220301-AB12CD"
                invalid={!!lookupError}
                aria-describedby="registration_code-error"
              />
            </Field>
            <Button type="submit" variant="dark" disabled={lookingUp}>
              {lookingUp ? "查詢中…" : "查詢"}
            </Button>
          </form>

          {registration && (
            <div className="flex flex-col gap-3 border border-ink bg-[#fafafa] p-4">
              <div className="flex flex-wrap items-center gap-3">
                <span className="text-xl font-bold text-ink">
                  {registration.team_name}
                </span>
                <Tag color="teal" className="text-base">
                  {awardName(registration.award_key)}
                </Tag>
              </div>
              <p className="text-sm leading-[160%] text-body">
                聯絡人：{registration.contact_name}{" | "}狀態：
                {alreadySubmitted ? "已交件（可更新）" : "尚未交件"}
              </p>
              {alreadySubmitted && registration.submission?.file_original_name && (
                <p className="text-sm leading-[160%] text-body">
                  已上傳檔案：{registration.submission.file_original_name}
                </p>
              )}
            </div>
          )}
        </Card>

        {/* Step 2 — submission form (revealed only after a successful lookup) */}
        {registration && (
        <Card className="gap-5">
          <h2 className="text-2xl font-bold text-ink">
            ② 上傳作品
            {alreadySubmitted && (
              <span className="ml-2 text-base font-bold text-body">（更新交件）</span>
            )}
          </h2>

          {formError && <ErrorBanner message={formError} />}

          <div className="flex flex-col gap-5">
            <Field label="作品名稱" htmlFor="work_title" required error={errors.work_title}>
              <Input
                id="work_title"
                value={workTitle}
                onChange={(e) => setWorkTitle(e.target.value)}
                maxLength={160}
                invalid={!!errors.work_title}
                aria-describedby="work_title-error"
              />
            </Field>

            <Field
              label="作品摘要"
              htmlFor="work_summary"
              required
              hint="簡述作品內容與亮點（上限 3000 字）。"
              error={errors.work_summary}
            >
              <Textarea
                id="work_summary"
                rows={6}
                value={workSummary}
                onChange={(e) => setWorkSummary(e.target.value)}
                maxLength={3000}
                invalid={!!errors.work_summary}
                aria-describedby="work_summary-error"
              />
            </Field>

            <Field
              label="策略單內容"
              htmlFor="strategy_statement"
              hint="說明你的新聞策略與創意手法（選填，上限 8000 字）。"
              error={errors.strategy_statement}
            >
              <Textarea
                id="strategy_statement"
                rows={6}
                value={strategy}
                onChange={(e) => setStrategy(e.target.value)}
                maxLength={8000}
                invalid={!!errors.strategy_statement}
              />
            </Field>

            <Field
              label="作品檔案"
              htmlFor="work_file"
              hint="可接受 PDF / Word / PowerPoint / ZIP，單檔上限 20MB（選填）。"
              error={errors.work_file}
            >
              <input
                id="work_file"
                type="file"
                accept={ACCEPTED}
                onChange={(e) => setFile(e.target.files?.[0] ?? null)}
                aria-invalid={!!errors.work_file || undefined}
                className="block w-full text-base text-ink file:mr-4 file:cursor-pointer file:border file:border-ink file:bg-brand file:px-4 file:py-2 file:font-bold file:text-ink hover:file:bg-brand-hover"
              />
              {file && (
                <p className="text-sm text-body">
                  已選擇：{file.name}（{(file.size / 1024 / 1024).toFixed(1)}MB）
                </p>
              )}
            </Field>

            <div className="flex items-center gap-4 max-[640px]:flex-col max-[640px]:items-stretch">
              <Button type="submit" size="lg" onClick={onSubmit} disabled={submitting}>
                {submitting ? "送出中…" : alreadySubmitted ? "更新作品" : "送出作品"}
              </Button>
              <Link
                to="/"
                className="font-bold text-ink underline underline-offset-4 max-[640px]:text-center"
              >
                返回首頁
              </Link>
            </div>
          </div>
        </Card>
        )}
      </div>
    </main>
  );
};

const ErrorBanner = ({ message }: { message: string }) => (
  <div
    role="alert"
    className="border border-ink bg-danger px-5 py-4 font-bold leading-[160%] text-white drop-shadow-hard-md"
  >
    {message}
  </div>
);

const SuccessPanel = ({ submission }: { submission: Submission }) => (
  <main className="relative flex min-h-screen w-full flex-col items-center overflow-hidden bg-section-mint px-6 pb-32 pt-[150px] max-[768px]:pt-[120px]">
    <div className="grid-bg-blue pointer-events-none absolute inset-0 opacity-25" />
    <div className="relative z-10 w-full max-w-[640px]">
      <SectionTitle color="brand" size="lg" className="mb-8 text-center max-[768px]:text-display-sm">
        交件完成！
      </SectionTitle>
      <Card className="items-center gap-4 text-center">
        <p className="font-bold leading-[160%] text-ink">
          作品「{submission.work_title}」已成功送出。
        </p>
        {submission.file_original_name && (
          <p className="text-sm leading-[160%] text-body">
            已上傳檔案：{submission.file_original_name}
          </p>
        )}
        {submission.submitted_at && (
          <p className="text-sm leading-[160%] text-body">
            交件時間：{new Date(submission.submitted_at).toLocaleString("zh-TW")}
          </p>
        )}
        <p className="text-sm leading-[160%] text-body">
          如需修改，可於交件期間內以相同報名編號重新交件覆蓋。
        </p>
        <div className="mt-2 flex w-full items-center justify-center gap-4 max-[640px]:flex-col">
          <Button as="a" href="/submit" variant="secondary">
            再次交件 / 更新
          </Button>
          <Button as="a" href="/" variant="dark">
            返回首頁
          </Button>
        </div>
      </Card>
    </div>
  </main>
);

export default SubmitPage;
