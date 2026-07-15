export const PLAN_CATEGORIES = ['Nutrition', 'Lifestyle', 'Medications'] as const;
export type PlanCategory = (typeof PLAN_CATEGORIES)[number];

export const DEEP_DIVE_CATEGORY_STATUSES = ['AT RISK', 'IN RANGE', 'OPTIMAL'] as const;
export type DeepDiveCategoryStatus = (typeof DEEP_DIVE_CATEGORY_STATUSES)[number];

export const BIOMARKER_RELEVANCY_LEVELS = ['High', 'Medium', 'Low'] as const;
export type BiomarkerRelevancy = (typeof BIOMARKER_RELEVANCY_LEVELS)[number];

export const BIOMARKER_STATUSES = ['abnormal', 'inRange', 'optimal'] as const;
export type BiomarkerStatus = (typeof BIOMARKER_STATUSES)[number];

export interface ReportData {
  clinicName: string;
  patient: { name: string; sex: string; age: number };
  preparedBy: { doctorName: string; clinicName: string };
  dates: { assessment: string; generated: string };
  healthStatus: { quote: string; author: string };
  story: { title: string; text: string }[];
  goals: {
    number: number;
    title: string;
    addresses: string;
    categories: string[];
    durationWeeks: number;
    metrics: {
      name: string;
      current: string;
      target: string;
      timeframe: string;
    }[];
  }[];
  plan: {
    intro: string;
    groups: {
      category: PlanCategory;
      items: string[];
    }[];
  };
  timeline: {
    subtitle: string;
    phases: {
      label: string;
      milestones: string[];
      planCheckIns: string[];
    }[];
  };
  coach: {
    subtitle: string;
    guides: {
      title: string;
      subtitle: string;
      whatToDo: string;
      whyItMatters: string;
      howItWorks?: string;
      week1Plan: string;
      eatAvoid?: string;
      commonQuestions: { question: string; answer: string }[];
      tip?: string;
    }[];
  };
  deepDive: {
    categories: {
      name: string;
      status: DeepDiveCategoryStatus;
      narrative: string;
      counts: { abnormal: number; inRange: number; optimal: number };
      biomarkers: {
        relevancy: BiomarkerRelevancy;
        name: string;
        value: string;
        referenceRange: string;
        optimalRange: string;
        date: string;
        status: BiomarkerStatus;
      }[];
    }[];
  };
  orders: {
    labs: string[];
    referrals: string[];
    imaging: string[];
  };
}
