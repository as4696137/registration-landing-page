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

async function parseApiResponse<T>(response: Response) {
  const body = await response.json();

  if (!response.ok) {
    throw body;
  }

  return body as { data: T };
}

export const contestApi = {
  async getContest() {
    const response = await fetch('/api/contest', {
      headers: { Accept: 'application/json' },
    });
    const body = await parseApiResponse<ContestConfig>(response);
    return body.data;
  },

  async createRegistration(payload: CreateRegistrationPayload) {
    const response = await fetch('/api/registrations', {
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
    const response = await fetch(`/api/registrations/${registrationCode}`, {
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

    const response = await fetch('/api/submissions', {
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
