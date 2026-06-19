export type ContestAward = {
  key: string;
  name: string;
  prompt: string;
};

export type ContestConfig = {
  name: string;
  registration_period: {
    starts_at: string;
    ends_at: string;
  };
  submission_period: {
    starts_at: string;
    ends_at: string;
  };
  team_size: {
    min: number;
    max: number;
  };
  awards: ContestAward[];
};

export type RegistrationMember = {
  name: string;
  email?: string;
  age: number;
  role?: string;
  school_or_company?: string;
};

export type CreateRegistrationPayload = {
  team_name: string;
  award_key: string;
  contact_name: string;
  contact_email: string;
  contact_phone?: string;
  members: RegistrationMember[];
};

export type Registration = CreateRegistrationPayload & {
  id: string;
  registration_code: string;
  status: 'registered' | 'submitted' | string;
  created_at: string;
  submission?: Submission | null;
};

export type Submission = {
  id: string;
  registration_id: string;
  work_title: string;
  work_summary: string;
  strategy_statement?: string | null;
  file_original_name?: string | null;
  file_url?: string | null;
  status: 'submitted' | string;
  submitted_at?: string | null;
  updated_at?: string | null;
};

export const fallbackContestConfig: ContestConfig = {
  name: '初聲新聞獎',
  registration_period: {
    starts_at: '2022-03-01',
    ends_at: '2022-05-25',
  },
  submission_period: {
    starts_at: '2022-03-01',
    ends_at: '2022-07-10',
  },
  team_size: {
    min: 1,
    max: 6,
  },
  awards: [
    {
      key: 'audience_insight',
      name: '最佳新聞受眾洞察獎',
      prompt: '新聞要對誰說話？',
    },
    {
      key: 'strategy_creativity',
      name: '最佳新聞策略創意獎',
      prompt: '新聞怎麼說話？',
    },
    {
      key: 'experience_innovation',
      name: '最佳新聞體驗創新獎',
      prompt: '新聞用什麼說話？',
    },
  ],
};

const DEFAULT_API_BASE_URL = import.meta.env.PROD
  ? 'https://registration-landing-page-api.onrender.com/api'
  : '/api';

const API_BASE_URL = (import.meta.env.VITE_API_BASE_URL || DEFAULT_API_BASE_URL).replace(/\/$/, '');

function apiUrl(path: string) {
  return `${API_BASE_URL}${path}`;
}

async function parseApiResponse<T>(response: Response) {
  const body = await response.json();

  if (!response.ok) {
    throw body;
  }

  return body as { data: T };
}

export const contestApi = {
  async getContest() {
    const response = await fetch(apiUrl('/contest'), {
      headers: { Accept: 'application/json' },
    });
    const body = await parseApiResponse<ContestConfig>(response);
    return body.data;
  },

  async createRegistration(payload: CreateRegistrationPayload) {
    const response = await fetch(apiUrl('/registrations'), {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });
    const body = await parseApiResponse<Registration>(response);
    return body.data;
  },

  async getRegistration(registrationCode: string) {
    const response = await fetch(apiUrl(`/registrations/${encodeURIComponent(registrationCode)}`), {
      headers: { Accept: 'application/json' },
    });
    const body = await parseApiResponse<Registration>(response);
    return body.data;
  },

  async submitWork(payload: {
    registration_code: string;
    work_title: string;
    work_summary: string;
    strategy_statement?: string;
    work_file?: File;
  }) {
    const formData = new FormData();

    Object.entries(payload).forEach(([key, value]) => {
      if (value !== undefined) {
        formData.append(key, value);
      }
    });

    const response = await fetch(apiUrl('/submissions'), {
      method: 'POST',
      headers: {
        Accept: 'application/json',
      },
      body: formData,
    });
    const body = await parseApiResponse<Submission>(response);

    return body.data;
  },
};
