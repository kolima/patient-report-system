import type { ReportData } from "../common/report-data";

const doronReport: ReportData = {
  clinicName: "At Doron's #2",
  patient: { name: "Doron Patient3", sex: "Male", age: 49 },
  preparedBy: {
    doctorName: "Dr. Doron Owner1",
    clinicName: "At Doron's #2",
  },
  dates: {
    assessment: "Jun 29, 2026",
    generated: "Jun 29, 2026",
  },
  healthStatus: {
    quote:
      "Since your last assessment, the core metabolic and kidney themes are still present, but the newer chart information adds important context. Your strongest objective signals remain reassuring blood counts, normal thyroid screening, and normal liver chemistries on the last available labs. The main issue is still an insulin-resistance pattern with elevated fasting insulin, high triglycerides, low HDL, and borderline LDL on the last fasting panel, and the older 2023 results show this has been a longer-running pattern. Kidney function still looks mildly reduced rather than clearly normal, and that matters more now that hypertension is documented. The hormone picture is less mysterious than before because the testosterone rise is now more consistent with active enclomiphene treatment, but it still needs monitoring. New charted diagnoses of hypertension, psoriasis, ADHD, and depression also widen the prevention focus beyond labs alone. The good news is that this still looks like a window for active risk reduction rather than advanced organ failure, but the next step is to refresh the stale lab picture and fill the biggest gaps, especially actual blood pressure readings, ApoB, Lp(a), urine albumin, cystatin C, and a formal sleep assessment.",
    author: "Dr. Doron Owner1",
  },
  story: [
    {
      title: "Kidney monitoring",
      text: "You want to keep a close eye on your kidney function and understand whether the prior creatinine and eGFR pattern represents a stable mild issue or something that needs stronger protection.",
    },
    {
      title: "Glycemic control",
      text: "You want a clearer read on your blood sugar control and insulin resistance, not just whether you meet a diabetes cutoff.",
    },
    {
      title: "Lipid management",
      text: "You want to improve your cholesterol profile and better define your long-term cardiovascular prevention strategy.",
    },
    {
      title: "Hormone evaluation",
      text: "You want to understand your reproductive hormone pattern better, especially given the short-term variability in testosterone, LH, FSH, and estradiol.",
    },
    {
      title: "Blood pressure control",
      text: "You want to know whether your blood pressure is truly controlled and how it fits into your broader prevention plan.",
    },
    {
      title: "Mental health",
      text: "You want your depression and ADHD care to be part of the overall longevity plan, not treated as separate from the rest of your health.",
    },
  ],
  goals: [
    {
      number: 1,
      title: "Lower insulin and triglycerides",
      addresses: "Chronic insulin resistance",
      categories: ["Metabolic Health", "Liver Health", "Nutrition & Vitamins"],
      durationWeeks: 24,
      metrics: [
        {
          name: "Hemoglobin A1c",
          current: "5.5 %",
          target: "5.2 %",
          timeframe: "24 weeks",
        },
        {
          name: "Insulin",
          current: "27.8 uIU/mL",
          target: "18 uIU/mL",
          timeframe: "12 weeks",
        },
        {
          name: "Triglycerides",
          current: "187 mg/dL",
          target: "140 mg/dL",
          timeframe: "12 weeks",
        },
      ],
    },
    {
      number: 2,
      title: "Lower lipid and BP risk",
      addresses: "Hypertension plus dyslipidemia",
      categories: ["Cardiovascular Health", "Brain Health", "Inflammation"],
      durationWeeks: 24,
      metrics: [
        {
          name: "Non-HDL Cholesterol",
          current: "129 mg/dL",
          target: "100 mg/dL",
          timeframe: "12 weeks",
        },
        {
          name: "HDL Cholesterol",
          current: "39 mg/dL",
          target: "45 mg/dL",
          timeframe: "24 weeks",
        },
        {
          name: "LDL-Cholesterol",
          current: "101 mg/dL",
          target: "80 mg/dL",
          timeframe: "12 weeks",
        },
        {
          name: "Home blood pressure log",
          current: "not documented",
          target: "completed",
          timeframe: "3 weeks",
        },
      ],
    },
    {
      number: 3,
      title: "Protect kidney filtration",
      addresses: "Borderline renal function",
      categories: ["Kidney Health", "Cardiovascular Health"],
      durationWeeks: 24,
      metrics: [
        {
          name: "Creatinine",
          current: "1.33 mg/dL",
          target: "1.20 mg/dL",
          timeframe: "24 weeks",
        },
        {
          name: "eGFR",
          current: "66 mL/min/1.73m2",
          target: "75 mL/min/1.73m2",
          timeframe: "24 weeks",
        },
      ],
    },
    {
      number: 4,
      title: "Improve sleep and brain recovery",
      addresses: "Sleep and psychiatric strain",
      categories: ["Sleep Health", "Brain Health", "Emotional & Social Health"],
      durationWeeks: 12,
      metrics: [
        {
          name: "THC use",
          current: "nightly",
          target: "reduced or clinician-reviewed",
          timeframe: "12 weeks",
        },
        {
          name: "Psychiatric medication review",
          current: "not recently reconciled",
          target: "completed",
          timeframe: "6 weeks",
        },
        {
          name: "Sleep assessment",
          current: "not completed",
          target: "completed",
          timeframe: "4 weeks",
        },
      ],
    },
    {
      number: 5,
      title: "Lower fatty-liver risk",
      addresses: "Prior ALT elevation",
      categories: ["Liver Health", "Metabolic Health", "Nutrition & Vitamins"],
      durationWeeks: 24,
      metrics: [
        {
          name: "Insulin",
          current: "27.8 uIU/mL",
          target: "15 uIU/mL",
          timeframe: "24 weeks",
        },
        {
          name: "Triglycerides",
          current: "187 mg/dL",
          target: "120 mg/dL",
          timeframe: "24 weeks",
        },
      ],
    },
    {
      number: 6,
      title: "Protect knees and reserve",
      addresses: "Active knee OA",
      categories: ["Musculoskeletal Health", "Nutrition & Vitamins", "Blood Health"],
      durationWeeks: 12,
      metrics: [
        {
          name: "Strength training frequency",
          current: "3 sessions/week",
          target: "4 sessions/week",
          timeframe: "12 weeks",
        },
        {
          name: "DXA scan",
          current: "untested",
          target: "completed",
          timeframe: "12 weeks",
        },
      ],
    },
    {
      number: 7,
      title: "Monitor hormone therapy response",
      addresses: "Active hormone therapy follow-up",
      categories: ["Thyroid & Hormone Health"],
      durationWeeks: 12,
      metrics: [
        {
          name: "Estradiol",
          current: "53 pg/mL",
          target: "35 pg/mL",
          timeframe: "12 weeks",
        },
      ],
    },
    {
      number: 8,
      title: "Address psoriasis and prevention gaps",
      addresses: "Psoriasis and screening refinement",
      categories: ["Skin Health", "Inflammation", "Gut Health", "Cancer Screening"],
      durationWeeks: 12,
      metrics: [
        {
          name: "Full-body skin exam",
          current: "not documented",
          target: "completed",
          timeframe: "12 weeks",
        },
        {
          name: "Hereditary cancer risk review",
          current: "not completed",
          target: "completed",
          timeframe: "12 weeks",
        },
      ],
    },
  ],
  plan: {
    intro:
      "Based on your results and goals, your plan includes 1 nutrition, 5 lifestyle, and 1 medications. Everything here is designed to work together to help you feel better and stay on track. Your care team will walk you through each step.",
    groups: [
      { category: "Nutrition", items: ["Build protein-fiber meals"] },
      {
        category: "Lifestyle",
        items: [
          "Add cardio and lifting",
          "Track your home BP",
          "Set a fixed wake time",
          "Reduce nightly THC",
          "Start knee-smart training",
        ],
      },
      {
        category: "Medications",
        items: ["Continue enclomiphene as prescribed"],
      },
    ],
  },
  timeline: {
    subtitle: "Here's what happens next and when to expect check-ins.",
    phases: [
      {
        label: "Now",
        milestones: [
          "Fiber ramp",
          "Meal structure",
          "Base volume",
          "Strength habit",
          "Build walking base",
          "Aerobic base",
          "Run monitor",
          "Collect series",
          "Set technique",
          "Anchor mornings",
          "Measure baseline",
          "Pain-light baseline",
          "Keep dose stable",
        ],
        planCheckIns: [
          "Build protein-fiber meals",
          "Add cardio and lifting",
          "Track your home BP",
          "Set a fixed wake time",
          "Reduce nightly THC",
          "Start knee-smart training",
          "Continue enclomiphene as prescribed",
        ],
      },
      {
        label: "1 weeks",
        milestones: ["Viscous fiber", "Step down"],
        planCheckIns: ["Build protein-fiber meals", "Reduce nightly THC"],
      },
      {
        label: "2 weeks",
        milestones: ["Refine carbs", "Add strength sessions", "Review pattern", "Review trend", "Protect consistency"],
        planCheckIns: [
          "Build protein-fiber meals",
          "Add cardio and lifting",
          "Track your home BP",
          "Set a fixed wake time",
        ],
      },
      {
        label: "4 weeks",
        milestones: [
          "Interval add-on",
          "Progress aerobic volume",
          "Progress volume",
          "Quad-hip build",
          "Standardize lab timing",
        ],
        planCheckIns: ["Add cardio and lifting", "Start knee-smart training", "Continue enclomiphene as prescribed"],
      },
      {
        label: "6 weeks",
        milestones: ["Recheck effect", "Reassess sleep"],
        planCheckIns: ["Track your home BP", "Reduce nightly THC"],
      },
      {
        label: "8 weeks",
        milestones: ["Lipid review", "Fourth session", "Review response"],
        planCheckIns: ["Build protein-fiber meals", "Start knee-smart training", "Continue enclomiphene as prescribed"],
      },
      {
        label: "12 weeks",
        milestones: [],
        planCheckIns: ["Add cardio and lifting"],
      },
    ],
  },
  coach: {
    subtitle: "Here's your personalized guide for each part of your plan — what to take, when, and how to get started.",
    guides: [
      {
        title: "Build protein-fiber meals",
        subtitle: "Protein-Fiber Plate",
        whatToDo:
          "Build meals from protein first, then vegetables or other high-fiber foods, and keep refined starches and sugars as the smallest part of the plate.",
        whyItMatters:
          "Your last fasting pattern suggests your body was using excess insulin to hold glucose in range. Reducing that insulin demand is the fastest way to improve both metabolic risk and fatty-liver risk.",
        howItWorks:
          "Protein and fiber slow absorption, reduce post-meal glucose swings, improve fullness, and reduce the liver's drive to package excess energy into triglycerides.",
        week1Plan:
          "At two meals per day, make protein the anchor. Add one fiber-rich food at each meal. Remove one obvious source of sugar or refined starch that you eat most often.",
        eatAvoid:
          "Prioritize eggs, fish, Greek yogurt, tofu, poultry, beans, lentils, vegetables, berries, nuts, seeds, and minimally processed starches. Cut back on sugary drinks, desserts, large evening starch loads, and ultra-processed snack foods.",
        commonQuestions: [
          {
            question: "Do I need to go very low carb?",
            answer: "No. The goal is a lower-insulin pattern, not a rigid diet label.",
          },
          {
            question: "What if my A1c is already 5.5%?",
            answer: "Your insulin and triglycerides show there is still metabolic work happening behind that A1c.",
          },
        ],
        tip: "If you are unsure where to start, change breakfast first; it often sets the insulin pattern for the rest of the day.",
      },
      {
        title: "Add cardio and lifting",
        subtitle: "Zone 2 plus lifting",
        whatToDo: "Build a weekly routine that combines steady aerobic work with resistance training.",
        whyItMatters:
          "This is one of the most reliable ways to lower insulin resistance before diabetes develops. It also helps triglycerides, body composition, and liver fat risk.",
        howItWorks:
          "Working muscles take up more glucose and become more sensitive to insulin. Over time, your body does not need to over-secrete insulin to keep glucose normal.",
        week1Plan: "Do three brisk walks or bike sessions of 30-45 minutes and two short full-body strength sessions.",
        commonQuestions: [
          {
            question: "Do I need intense exercise?",
            answer:
              "No. Consistent moderate work plus basic strength training is enough to start changing the biology.",
          },
          {
            question: "What if I am deconditioned?",
            answer: "Start shorter and build; consistency matters more than intensity in week one.",
          },
        ],
        tip: "Schedule exercise right after work or before dinner so it becomes part of the same daily slot.",
      },
    ],
  },
  deepDive: {
    categories: [
      {
        name: "Cardiovascular Health",
        status: "AT RISK",
        narrative:
          "At risk due to newly documented essential hypertension requiring pharmacotherapy (propranolol), complicated by concurrent stimulant use (Adderall XR) and a strong family history of cardiovascular disease. The August 2025 clinic facesheet reveals this active disease state, which recontextualizes the patient's metabolic profile. Historical 2023-11-28 labs show a prior peak of severe atherogenic dyslipidemia (LDL-C 132 mg/dL, triglycerides 292 mg/dL) that has only partially improved on the 2025-06-09 fasting panel (LDL-C 101 mg/dL, triglycerides 187 mg/dL, insulin 27.8 uIU/mL). The immediate priority is obtaining objective home blood pressure logs to ensure the propranolol is adequately controlling hypertension against the stimulant's effects, alongside updating the stale lipid panel with ApoB and Lp(a) to finalize a prevention strategy.",
        counts: { abnormal: 10, inRange: 6, optimal: 2 },
        biomarkers: [
          {
            relevancy: "High",
            name: "Triglycerides (latest 2025-06)",
            value: "187 mg/dL",
            referenceRange: "< 150",
            optimalRange: "< 100",
            date: "Jun 9, 2025",
            status: "abnormal",
          },
          {
            relevancy: "High",
            name: "Insulin",
            value: "27.8 μIU/mL",
            referenceRange: "2–25",
            optimalRange: "2–8",
            date: "Jun 9, 2025",
            status: "abnormal",
          },
          {
            relevancy: "High",
            name: "LDL-Cholesterol (latest 2025-06)",
            value: "101 mg/dL",
            referenceRange: "< 130",
            optimalRange: "< 80",
            date: "Jun 9, 2025",
            status: "abnormal",
          },
          {
            relevancy: "Medium",
            name: "LDL-Cholesterol (baseline 2023-11)",
            value: "132 mg/dL",
            referenceRange: "< 130",
            optimalRange: "< 80",
            date: "Nov 28, 2023",
            status: "abnormal",
          },
          {
            relevancy: "Medium",
            name: "HDL Cholesterol (latest 2025-06)",
            value: "39 mg/dL",
            referenceRange: "> 40",
            optimalRange: "60–90",
            date: "Jun 9, 2025",
            status: "abnormal",
          },
          {
            relevancy: "Medium",
            name: "Triglycerides (baseline 2023-11)",
            value: "292 mg/dL",
            referenceRange: "< 150",
            optimalRange: "< 100",
            date: "Nov 28, 2023",
            status: "abnormal",
          },
          {
            relevancy: "Medium",
            name: "Non-HDL Cholesterol (baseline 2023-11)",
            value: "177 mg/dL",
            referenceRange: "< 160",
            optimalRange: "< 130",
            date: "Nov 28, 2023",
            status: "abnormal",
          },
          {
            relevancy: "Medium",
            name: "Hemoglobin A1c (baseline 2025-03)",
            value: "5.7 %",
            referenceRange: "4–5.6",
            optimalRange: "4.8–5.2",
            date: "Mar 27, 2025",
            status: "abnormal",
          },
          {
            relevancy: "Medium",
            name: "Hemoglobin A1c (latest 2025-06)",
            value: "5.5 %",
            referenceRange: "4–5.6",
            optimalRange: "4.8–5.2",
            date: "Jun 9, 2025",
            status: "abnormal",
          },
          {
            relevancy: "Medium",
            name: "Glucose (latest 2025-06)",
            value: "98 mg/dL",
            referenceRange: "65–99",
            optimalRange: "80–90",
            date: "Jun 9, 2025",
            status: "inRange",
          },
          {
            relevancy: "Medium",
            name: "Non-HDL Cholesterol (latest 2025-06)",
            value: "129 mg/dL",
            referenceRange: "< 160",
            optimalRange: "< 130",
            date: "Jun 9, 2025",
            status: "inRange",
          },
          {
            relevancy: "Medium",
            name: "hs-CRP",
            value: "0.5 mg/L",
            referenceRange: "< 1",
            optimalRange: "< 1",
            date: "Jun 9, 2025",
            status: "optimal",
          },
          {
            relevancy: "Low",
            name: "Creatinine (baseline 2025-03)",
            value: "1.48 mg/dL",
            referenceRange: "0.6–1.3",
            optimalRange: "0.8–1",
            date: "Mar 27, 2025",
            status: "abnormal",
          },
          {
            relevancy: "Low",
            name: "Creatinine (latest 2025-06)",
            value: "1.33 mg/dL",
            referenceRange: "0.6–1.3",
            optimalRange: "0.8–1",
            date: "Jun 9, 2025",
            status: "inRange",
          },
          {
            relevancy: "Low",
            name: "eGFR (latest 2025-06)",
            value: "66 mL/min/1.73m2",
            referenceRange: "> 60",
            optimalRange: "> 90",
            date: "Jun 9, 2025",
            status: "inRange",
          },
          {
            relevancy: "Low",
            name: "HDL Cholesterol (baseline 2023-11)",
            value: "40 mg/dL",
            referenceRange: "> 40",
            optimalRange: "60–90",
            date: "Nov 28, 2023",
            status: "inRange",
          },
          {
            relevancy: "Low",
            name: "Glucose (baseline 2025-03)",
            value: "92 mg/dL",
            referenceRange: "65–99",
            optimalRange: "80–90",
            date: "Mar 27, 2025",
            status: "inRange",
          },
          {
            relevancy: "Low",
            name: "eGFR (baseline 2025-03)",
            value: "58 mL/min/1.73m2",
            referenceRange: "> 60",
            optimalRange: "> 90",
            date: "Mar 27, 2025",
            status: "abnormal",
          },
        ],
      },
      {
        name: "Metabolic Health",
        status: "AT RISK",
        narrative:
          "Metabolic profile is AT RISK, driven by a chronic hyperinsulinemic insulin-resistance pattern. The most recent fasting draw (2025-06-09) showed insulin 27.8 uIU/mL with glucose 98 mg/dL, HbA1c 5.5%, triglycerides 187 mg/dL, HDL-C 39 mg/dL, and LDL-C 101 mg/dL. Newly integrated historical data from late 2023 reveals this is a long-standing issue, previously manifesting as severe hypertriglyceridemia (292 mg/dL) and elevated ALT (85 U/L), strongly suggesting hepatic insulin resistance and metabolic-associated steatotic liver disease (MASLD). While HbA1c, lipids, and ALT improved by mid-2025, the dominant signal of compensatory hyperinsulinemia persists. Furthermore, the patient is prescribed propranolol, a beta-blocker known to potentially worsen glycemic control and lipid profiles. These data are now about 12 months old, warranting confirmation with repeat fasting metabolic labs.",
        counts: { abnormal: 4, inRange: 3, optimal: 0 },
        biomarkers: [
          {
            relevancy: "High",
            name: "Insulin",
            value: "27.8 μIU/mL",
            referenceRange: "2–25",
            optimalRange: "2–8",
            date: "Jun 9, 2025",
            status: "abnormal",
          },
          {
            relevancy: "High",
            name: "Triglycerides (latest 2025-06)",
            value: "187 mg/dL",
            referenceRange: "< 150",
            optimalRange: "< 100",
            date: "Jun 9, 2025",
            status: "abnormal",
          },
          {
            relevancy: "Medium",
            name: "Hemoglobin A1c (latest 2025-06)",
            value: "5.5 %",
            referenceRange: "4–5.6",
            optimalRange: "4.8–5.2",
            date: "Jun 9, 2025",
            status: "abnormal",
          },
          {
            relevancy: "Medium",
            name: "HDL Cholesterol (latest 2025-06)",
            value: "39 mg/dL",
            referenceRange: "> 40",
            optimalRange: "60–90",
            date: "Jun 9, 2025",
            status: "abnormal",
          },
          {
            relevancy: "Medium",
            name: "Glucose (latest 2025-06)",
            value: "98 mg/dL",
            referenceRange: "65–99",
            optimalRange: "80–90",
            date: "Jun 9, 2025",
            status: "inRange",
          },
          {
            relevancy: "Low",
            name: "Hemoglobin A1c (baseline 2025-03)",
            value: "5.7 %",
            referenceRange: "4–5.6",
            optimalRange: "4.8–5.2",
            date: "Mar 27, 2025",
            status: "abnormal",
          },
          {
            relevancy: "Low",
            name: "Glucose (baseline 2025-03)",
            value: "92 mg/dL",
            referenceRange: "65–99",
            optimalRange: "80–90",
            date: "Mar 27, 2025",
            status: "inRange",
          },
        ],
      },
    ],
  },
  orders: {
    labs: [
      "Fasting metabolic follow-up panel",
      "Lipid risk refinement panel (fasting lipid panel + ApoB + Lp(a))",
      "Kidney clarification panel",
      "Liver-metabolic reassessment panel (CMP + GGT + CBC + fasting insulin + HbA1c + lipid panel)",
      "Male hormone surveillance panel (estradiol + total testosterone + free testosterone + SHBG + CBC/hematocrit + CMP)",
    ],
    referrals: [
      "Ambulatory blood pressure monitoring or clinician-validated hypertension follow-up",
      "Sleep medicine evaluation",
      "Psychiatry or prescribing-clinician medication review",
      "Physical therapy referral for bilateral knee osteoarthritis",
      "Dermatology referral for psoriasis staging and full-body skin exam",
      "Cancer genetics referral for hereditary risk review",
    ],
    imaging: ["Liver ultrasound with elastography", "DEXA body composition and bone density scan"],
  },
};

const sunriseReport: ReportData = {
  clinicName: "Sunrise Longevity Clinic",
  patient: { name: "Maya Chen", sex: "Female", age: 42 },
  preparedBy: {
    doctorName: "Dr. Elena Vasquez",
    clinicName: "Sunrise Longevity Clinic",
  },
  dates: {
    assessment: "Jul 10, 2026",
    generated: "Jul 10, 2026",
  },
  healthStatus: {
    quote:
      "Your metabolic markers show early insulin resistance with room for improvement through nutrition and movement. Vitamin D remains suboptimal, and sleep quality continues to affect daytime energy. Overall, this is a favorable window for preventive intervention before any chronic conditions develop.",
    author: "Dr. Elena Vasquez",
  },
  story: [
    {
      title: "Energy and sleep",
      text: "You want to understand why afternoon fatigue persists despite adequate sleep duration.",
    },
    {
      title: "Metabolic prevention",
      text: "You want to reverse early insulin resistance trends before they progress.",
    },
    {
      title: "Bone health",
      text: "With a family history of osteoporosis, you want a proactive bone density strategy.",
    },
  ],
  goals: [
    {
      number: 1,
      title: "Improve insulin sensitivity",
      addresses: "Early insulin resistance",
      categories: ["Metabolic Health", "Nutrition & Vitamins"],
      durationWeeks: 16,
      metrics: [
        {
          name: "Fasting insulin",
          current: "18 uIU/mL",
          target: "12 uIU/mL",
          timeframe: "16 weeks",
        },
        {
          name: "HbA1c",
          current: "5.6 %",
          target: "5.3 %",
          timeframe: "16 weeks",
        },
      ],
    },
    {
      number: 2,
      title: "Optimize vitamin D",
      addresses: "Suboptimal vitamin D",
      categories: ["Nutrition & Vitamins", "Bone Health"],
      durationWeeks: 12,
      metrics: [
        {
          name: "Vitamin D (25-OH)",
          current: "28 ng/mL",
          target: "45 ng/mL",
          timeframe: "12 weeks",
        },
      ],
    },
    {
      number: 3,
      title: "Establish sleep routine",
      addresses: "Irregular sleep schedule",
      categories: ["Sleep Health", "Brain Health"],
      durationWeeks: 8,
      metrics: [
        {
          name: "Sleep consistency score",
          current: "52%",
          target: "80%",
          timeframe: "8 weeks",
        },
        {
          name: "Sleep assessment",
          current: "not completed",
          target: "completed",
          timeframe: "4 weeks",
        },
      ],
    },
  ],
  plan: {
    intro:
      "Your personalized plan focuses on metabolic optimization and foundational lifestyle changes. Your care team will guide you through each recommendation.",
    groups: [
      {
        category: "Nutrition",
        items: ["Increase fiber and protein at breakfast", "Supplement vitamin D3 2000 IU daily"],
      },
      {
        category: "Lifestyle",
        items: ["Walk 30 minutes after meals", "Fixed bedtime by 10:30 PM"],
      },
      { category: "Medications", items: [] },
    ],
  },
  timeline: {
    subtitle: "Your check-in schedule for the next few months.",
    phases: [
      {
        label: "Now",
        milestones: ["Baseline labs", "Sleep diary"],
        planCheckIns: ["Increase fiber and protein at breakfast", "Walk 30 minutes after meals"],
      },
      {
        label: "4 weeks",
        milestones: ["Review energy trends"],
        planCheckIns: ["Fixed bedtime by 10:30 PM"],
      },
      {
        label: "8 weeks",
        milestones: ["Repeat metabolic panel"],
        planCheckIns: ["Supplement vitamin D3 2000 IU daily"],
      },
    ],
  },
  coach: {
    subtitle: "Practical guidance to help you get started with each recommendation.",
    guides: [
      {
        title: "Increase fiber and protein at breakfast",
        subtitle: "Morning anchor meal",
        whatToDo: "Start each day with 25-30g protein and at least one high-fiber food before 9 AM.",
        whyItMatters: "Breakfast sets your glucose and insulin pattern for the rest of the day.",
        week1Plan: "Swap your usual breakfast for Greek yogurt with berries and chia, or eggs with vegetables.",
        commonQuestions: [
          {
            question: "What if I skip breakfast?",
            answer: "Try a protein-rich snack within an hour of waking instead.",
          },
        ],
        tip: "Prep breakfast components on Sunday to remove weekday friction.",
      },
    ],
  },
  deepDive: {
    categories: [
      {
        name: "Metabolic Health",
        status: "IN RANGE",
        narrative:
          "Early insulin resistance is present but reversible. Fasting insulin of 18 uIU/mL with HbA1c 5.6% indicates compensatory hyperinsulinemia without diabetes. Nutrition and movement interventions at this stage can prevent progression.",
        counts: { abnormal: 2, inRange: 1, optimal: 0 },
        biomarkers: [
          {
            relevancy: "High",
            name: "Fasting insulin",
            value: "18 uIU/mL",
            referenceRange: "2–25",
            optimalRange: "2–8",
            date: "Jul 10, 2026",
            status: "abnormal",
          },
          {
            relevancy: "High",
            name: "HbA1c",
            value: "5.6 %",
            referenceRange: "4–5.6",
            optimalRange: "4.8–5.2",
            date: "Jul 10, 2026",
            status: "abnormal",
          },
          {
            relevancy: "Medium",
            name: "Vitamin D (25-OH)",
            value: "28 ng/mL",
            referenceRange: "30–100",
            optimalRange: "40–60",
            date: "Jul 10, 2026",
            status: "abnormal",
          },
        ],
      },
    ],
  },
  orders: {
    labs: [
      "Comprehensive metabolic panel with fasting insulin",
      "Vitamin D and B12 panel",
      "Thyroid screening (TSH, free T4)",
    ],
    referrals: ["Sleep medicine consultation"],
    imaging: ["DEXA bone density scan"],
  },
};

import { DEMO_CLINIC_IDS } from "./clinic-ids";

export const REPORT_DATA_BY_CLINIC_ID: Record<string, ReportData> = {
  [DEMO_CLINIC_IDS.doron]: doronReport,
  [DEMO_CLINIC_IDS.sunrise]: sunriseReport,
};

export function getReportDataForClinic(clinicId: string): ReportData | undefined {
  return REPORT_DATA_BY_CLINIC_ID[clinicId];
}
