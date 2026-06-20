import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";

import {
  Button,
  Card,
  Field,
  Input,
  SectionTitle,
  Tag,
} from "../design-system";
import CustomSelect from "../components/homepage/widget/CustomSelect";
import {
  contestApi,
  fallbackContestConfig,
  type ContestConfig,
  type CreateRegistrationPayload,
  type Registration,
  type RegistrationMember,
} from "../utils/contestApi";
import { normalizeApiError, type FieldErrors } from "../utils/formErrors";

const emptyMember = (): RegistrationMember => ({
  name: "",
  email: "",
  age: "" as unknown as number,
  role: "",
  school_or_company: "",
});

const tagColors = ["yellow", "teal", "pink"] as const;

const RegisterPage = () => {
  const [contest, setContest] = useState<ContestConfig>(fallbackContestConfig);
  const [teamName, setTeamName] = useState("");
  const [awardKey, setAwardKey] = useState("");
  const [contactName, setContactName] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const [contactPhone, setContactPhone] = useState("");
  const [members, setMembers] = useState<RegistrationMember[]>([emptyMember()]);

  const [errors, setErrors] = useState<FieldErrors>({});
  const [formError, setFormError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [result, setResult] = useState<Registration | null>(null);

  useEffect(() => {
    contestApi.getContest().then(setContest).catch(() => {
      setContest(fallbackContestConfig);
    });
  }, []);

  const maxMembers = contest.team_size.max;

  const updateMember = (
    index: number,
    patch: Partial<RegistrationMember>,
  ) => {
    setMembers((prev) =>
      prev.map((m, i) => (i === index ? { ...m, ...patch } : m)),
    );
  };

  const addMember = () => {
    if (members.length < maxMembers) setMembers((prev) => [...prev, emptyMember()]);
  };

  const removeMember = (index: number) => {
    setMembers((prev) =>
      prev.length > 1 ? prev.filter((_, i) => i !== index) : prev,
    );
  };

  const buildPayload = (): CreateRegistrationPayload => ({
    team_name: teamName.trim(),
    award_key: awardKey,
    contact_name: contactName.trim(),
    contact_email: contactEmail.trim(),
    contact_phone: contactPhone.trim() || undefined,
    members: members.map((m) => ({
      name: m.name.trim(),
      email: m.email?.trim() || undefined,
      age: Number(m.age),
      role: m.role?.trim() || undefined,
      school_or_company: m.school_or_company?.trim() || undefined,
    })),
  });

  const validate = (): FieldErrors => {
    const next: FieldErrors = {};
    if (!teamName.trim()) next.team_name = "請填寫團隊名稱。";
    if (!awardKey) next.award_key = "請選擇參賽獎項。";
    if (!contactName.trim()) next.contact_name = "請填寫聯絡人姓名。";
    if (!contactEmail.trim()) next.contact_email = "請填寫聯絡信箱。";
    members.forEach((m, i) => {
      if (!m.name.trim()) next[`members.${i}.name`] = "請填寫成員姓名。";
      const age = Number(m.age);
      if (!m.age && m.age !== 0) next[`members.${i}.age`] = "請填寫年齡。";
      else if (Number.isNaN(age) || age < 1 || age > 27)
        next[`members.${i}.age`] = "年齡需介於 1–27 歲。";
    });
    return next;
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
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
      const registration = await contestApi.createRegistration(buildPayload());
      setResult(registration);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (err) {
      const normalized = normalizeApiError(err);
      setErrors(normalized.fields);
      setFormError(normalized.message);
    } finally {
      setSubmitting(false);
    }
  };

  const selectedAward = useMemo(
    () => contest.awards.find((a) => a.key === awardKey),
    [contest, awardKey],
  );

  if (result) {
    return <SuccessPanel registration={result} />;
  }

  return (
    <main className="relative min-h-screen w-full overflow-hidden bg-section-green px-6 pb-32 pt-[150px] max-[768px]:pt-[120px]">
      <div className="grid-bg-blue pointer-events-none absolute inset-0 opacity-25" />
      <div className="relative z-10 mx-auto flex w-full max-w-[860px] flex-col">
        <SectionTitle color="brand" size="lg" className="mb-4 max-[768px]:text-display-sm">
          點我報名
        </SectionTitle>
        <p className="mb-10 max-w-[640px] font-bold leading-[160%] text-ink">
          填寫團隊與成員資料完成報名，送出後會取得專屬「報名編號」，請妥善保存，
          屆時於「交件專區」交件時需使用。
          （報名期間 {contest.registration_period.starts_at} ～{" "}
          {contest.registration_period.ends_at}）
        </p>

        {formError && <ErrorBanner message={formError} />}

        <form onSubmit={onSubmit} noValidate className="flex flex-col gap-8">
          {/* 團隊資料 */}
          <Card className="relative z-30 gap-5 overflow-visible">
            <h2 className="text-2xl font-bold text-ink">團隊資料</h2>
            <Field label="團隊名稱" htmlFor="team_name" required error={errors.team_name}>
              <Input
                id="team_name"
                value={teamName}
                onChange={(e) => setTeamName(e.target.value)}
                maxLength={120}
                invalid={!!errors.team_name}
                aria-describedby="team_name-error"
              />
            </Field>

            <Field label="參賽獎項" htmlFor="award_key" required error={errors.award_key}>
              <CustomSelect
                id="award_key"
                className="w-full"
                options={contest.awards.map((award) => ({
                  value: award.key,
                  label: award.name,
                }))}
                selectedOption={
                  selectedAward
                    ? { value: selectedAward.key, label: selectedAward.name }
                    : null
                }
                setSelectedOption={(opt) => setAwardKey(opt.value)}
                placeholder="請選擇參賽獎項"
                invalid={!!errors.award_key}
                aria-describedby="award_key-error"
              />
            </Field>

            {selectedAward && (
              <Tag
                color={
                  tagColors[
                    contest.awards.findIndex((a) => a.key === awardKey) %
                      tagColors.length
                  ]
                }
              >
                「{selectedAward.prompt}」
              </Tag>
            )}
          </Card>

          {/* 聯絡人 */}
          <Card className="gap-5">
            <h2 className="text-2xl font-bold text-ink">聯絡人</h2>
            <div className="grid grid-cols-2 gap-5 max-[640px]:grid-cols-1">
              <Field label="聯絡人姓名" htmlFor="contact_name" required error={errors.contact_name}>
                <Input
                  id="contact_name"
                  value={contactName}
                  onChange={(e) => setContactName(e.target.value)}
                  maxLength={80}
                  invalid={!!errors.contact_name}
                  aria-describedby="contact_name-error"
                />
              </Field>
              <Field label="聯絡電話" htmlFor="contact_phone" error={errors.contact_phone}>
                <Input
                  id="contact_phone"
                  value={contactPhone}
                  onChange={(e) => setContactPhone(e.target.value)}
                  maxLength={40}
                  inputMode="tel"
                  invalid={!!errors.contact_phone}
                />
              </Field>
            </div>
            <Field label="聯絡信箱" htmlFor="contact_email" required error={errors.contact_email}>
              <Input
                id="contact_email"
                type="email"
                value={contactEmail}
                onChange={(e) => setContactEmail(e.target.value)}
                maxLength={255}
                invalid={!!errors.contact_email}
                aria-describedby="contact_email-error"
              />
            </Field>
          </Card>

          {/* 團隊成員 */}
          <Card className="gap-5">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-ink">
                團隊成員
                <span className="ml-2 text-base font-bold text-body">
                  （{members.length}/{maxMembers}）
                </span>
              </h2>
              <Button
                type="button"
                size="sm"
                variant="secondary"
                onClick={addMember}
                disabled={members.length >= maxMembers}
              >
                ＋ 新增成員
              </Button>
            </div>
            <p className="text-sm leading-normal text-body">
              成員年齡上限為 27 歲；最多 {maxMembers} 人。
            </p>

            <div className="flex flex-col gap-6">
              {members.map((member, i) => (
                <div
                  key={i}
                  className="flex flex-col gap-4 border border-ink bg-[#fafafa] p-4"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-lg font-bold text-ink">
                      成員 {i + 1}
                    </span>
                    {members.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeMember(i)}
                        className="text-sm font-bold text-danger underline underline-offset-2"
                      >
                        移除
                      </button>
                    )}
                  </div>
                  <div className="grid grid-cols-2 gap-4 max-[640px]:grid-cols-1">
                    <Field
                      label="姓名"
                      htmlFor={`member-${i}-name`}
                      required
                      error={errors[`members.${i}.name`]}
                    >
                      <Input
                        id={`member-${i}-name`}
                        value={member.name}
                        onChange={(e) => updateMember(i, { name: e.target.value })}
                        maxLength={80}
                        invalid={!!errors[`members.${i}.name`]}
                      />
                    </Field>
                    <Field
                      label="年齡"
                      htmlFor={`member-${i}-age`}
                      required
                      error={errors[`members.${i}.age`]}
                    >
                      <Input
                        id={`member-${i}-age`}
                        type="number"
                        min={1}
                        max={27}
                        value={member.age as unknown as string}
                        onChange={(e) =>
                          updateMember(i, {
                            age: e.target.value as unknown as number,
                          })
                        }
                        invalid={!!errors[`members.${i}.age`]}
                      />
                    </Field>
                    <Field label="Email" htmlFor={`member-${i}-email`} error={errors[`members.${i}.email`]}>
                      <Input
                        id={`member-${i}-email`}
                        type="email"
                        value={member.email ?? ""}
                        onChange={(e) => updateMember(i, { email: e.target.value })}
                        maxLength={255}
                        invalid={!!errors[`members.${i}.email`]}
                      />
                    </Field>
                    <Field label="角色 / 分工" htmlFor={`member-${i}-role`}>
                      <Input
                        id={`member-${i}-role`}
                        value={member.role ?? ""}
                        onChange={(e) => updateMember(i, { role: e.target.value })}
                        maxLength={80}
                      />
                    </Field>
                    <Field
                      label="學校 / 公司"
                      htmlFor={`member-${i}-org`}
                      className="col-span-2 max-[640px]:col-span-1"
                    >
                      <Input
                        id={`member-${i}-org`}
                        value={member.school_or_company ?? ""}
                        onChange={(e) =>
                          updateMember(i, { school_or_company: e.target.value })
                        }
                        maxLength={120}
                      />
                    </Field>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          <div className="flex items-center gap-4 max-[640px]:flex-col max-[640px]:items-stretch">
            <Button type="submit" size="lg" disabled={submitting}>
              {submitting ? "送出中…" : "送出報名"}
            </Button>
            <Link
              to="/"
              className="font-bold text-ink underline underline-offset-4 max-[640px]:text-center"
            >
              返回首頁
            </Link>
          </div>
        </form>
      </div>
    </main>
  );
};

const ErrorBanner = ({ message }: { message: string }) => (
  <div
    role="alert"
    className="mb-8 border border-ink bg-danger px-5 py-4 font-bold leading-[160%] text-white drop-shadow-hard-md"
  >
    {message}
  </div>
);

const SuccessPanel = ({ registration }: { registration: Registration }) => {
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(registration.registration_code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  };

  return (
    <main className="relative flex min-h-screen w-full flex-col items-center overflow-hidden bg-section-green px-6 pb-32 pt-[150px] max-[768px]:pt-[120px]">
      <div className="grid-bg-blue pointer-events-none absolute inset-0 opacity-25" />
      <div className="relative z-10 w-full max-w-[640px]">
        <SectionTitle color="brand" size="lg" className="mb-8 text-center max-[768px]:text-display-sm">
          報名完成！
        </SectionTitle>
        <Card className="items-center gap-4 text-center">
          <p className="font-bold leading-[160%] text-ink">
            「{registration.team_name}」報名成功，請記下你的報名編號：
          </p>
          <div className="w-full border border-ink bg-brand px-5 py-4 drop-shadow-hard-md">
            <span className="font-display text-3xl tracking-wider text-ink max-[640px]:text-2xl">
              {registration.registration_code}
            </span>
          </div>
          <p className="text-sm leading-[160%] text-body">
            交件時需使用此編號，請務必保存。我們也已記錄於聯絡信箱
            {registration.contact_email ? ` ${registration.contact_email}` : ""}。
          </p>
          <div className="mt-2 flex w-full items-center justify-center gap-4 max-[640px]:flex-col">
            <Button type="button" variant="secondary" onClick={copy}>
              {copied ? "已複製 ✓" : "複製編號"}
            </Button>
            <Button as="link" to="/submit" variant="dark">
              前往交件專區
            </Button>
          </div>
        </Card>
      </div>
    </main>
  );
};

export default RegisterPage;
