import { ContactMethod, ProfileRecord } from '../types';

export const profileRecord: ProfileRecord = {
  name: 'Arjoneel Ghosh',
  headline: 'Machine Learning Engineer and Full-Stack Developer',
  shortBio:
    'I like to build machine learning systems and full stack products, with a focus on forecasting, computer vision, and data driven tools that turn complex technical work into usable and credible experiences.',
  longBio: [
    'I have worked across machine learning, software development, and product focused technical systems, with most of my work centered on turning complex data, models, and research oriented ideas into applications that feel clear, structured, and useful. My projects have included forecasting systems, assistive computer vision prototypes, business facing web products, and internal style data tools, and through all of them I have been most interested in the point where technical depth meets practical delivery.',
    'What motivates me is not just building a model or shipping an interface, but shaping the full path between them, from data preparation and experimentation to workflows, interaction, and communication. I care about making technically serious work easier to trust, easier to understand, and more meaningful in real use, which is why I am drawn to projects that combine strong implementation with thoughtful product experience.',
  ],
  currentFocus: [
    'Machine learning systems and forecasting workflows',
    'Computer vision and assistive interfaces',
    'Data tooling and product oriented application delivery',
  ],
  skillGroups: [
    {
      id: 'ml-forecasting',
      label: 'Machine Learning and Forecasting',
      description:
        'I like to work on practical machine learning systems with a strong focus on forecasting, structured experimentation, feature engineering, model evaluation, and turning analytical workflows into usable applications.',
      skills: [
        { name: 'Python', emphasis: 'Core' },
        { name: 'scikit-learn', emphasis: 'Strong' },
        { name: 'XGBoost', emphasis: 'Strong' },
        { name: 'LightGBM', emphasis: 'Working' },
        { name: 'CatBoost', emphasis: 'Working' },
        { name: 'Random Forest', emphasis: 'Strong' },
        { name: 'Prophet', emphasis: 'Strong' },
        { name: 'ARIMA / AutoARIMA', emphasis: 'Strong' },
        { name: 'Forecasting Workflows', emphasis: 'Strong' },
        { name: 'Feature Engineering', emphasis: 'Strong' },
        { name: 'Model Evaluation', emphasis: 'Strong' },
        { name: 'Time-Series Analysis', emphasis: 'Strong' },
      ],
    },
    {
      id: 'cv-applied-ml',
      label: 'Computer Vision and Applied ML',
      description:
        'I have applied computer vision work where live input, model inference, assistive interaction, and usable interface design need to work together as one system.',
      skills: [
        { name: 'OpenCV', emphasis: 'Strong' },
        { name: 'MediaPipe', emphasis: 'Strong' },
        { name: 'TensorFlow', emphasis: 'Working' },
        { name: 'Keras', emphasis: 'Working' },
        { name: 'PyTorch', emphasis: 'Working' },
        { name: 'YOLOv8', emphasis: 'Working' },
        { name: 'DeepLabV3+', emphasis: 'Working' },
        { name: 'Computer Vision', emphasis: 'Strong' },
        { name: 'Real-Time Inference', emphasis: 'Strong' },
        { name: 'Assistive Interfaces', emphasis: 'Strong' },
      ],
    },
    {
      id: 'full-stack-product',
      label: 'Full Stack and Product Delivery',
      description:
        'I like building technical products end to end, especially when the work involves connecting data, APIs, interfaces, model-backed logic, and clear user-facing workflows.',
      skills: [
        { name: 'React', emphasis: 'Core' },
        { name: 'TypeScript', emphasis: 'Strong' },
        { name: 'JavaScript', emphasis: 'Strong' },
        { name: 'Next.js', emphasis: 'Working' },
        { name: 'FastAPI', emphasis: 'Strong' },
        { name: 'Django', emphasis: 'Working' },
        { name: 'Node.js', emphasis: 'Working' },
        { name: 'Express', emphasis: 'Working' },
        { name: 'REST APIs', emphasis: 'Strong' },
        { name: 'Product Workflow Design', emphasis: 'Strong' },
        { name: 'Dashboard Interfaces', emphasis: 'Strong' },
      ],
    },
    {
      id: 'data-tooling',
      label: 'Data and Tooling',
      description:
        'A lot of my work depends on shaping messy information into reliable workflows, whether that means preprocessing, SQL pipelines, sampling logic, internal tools, dashboard utilities, or configuration-driven execution.',
      skills: [
        { name: 'Pandas', emphasis: 'Core' },
        { name: 'DuckDB', emphasis: 'Strong' },
        { name: 'SQL', emphasis: 'Strong' },
        { name: 'Streamlit', emphasis: 'Strong' },
        { name: 'MySQL', emphasis: 'Working' },
        { name: 'PostgreSQL', emphasis: 'Working' },
        { name: 'MongoDB', emphasis: 'Working' },
        { name: 'Pinecone', emphasis: 'Working' },
        { name: 'YAML / JSON Config Workflows', emphasis: 'Strong' },
        { name: 'Sampling and Balancing Logic', emphasis: 'Strong' },
        { name: 'Data Pipelines', emphasis: 'Strong' },
        { name: 'Internal Tooling', emphasis: 'Strong' },
      ],
    },
  ],
  education: [
    {
      id: 'edu-srm-btech-cse',
      institution: 'SRM Institute of Science and Technology',
      period: 'Aug 2022 - May 2026',
      qualification: 'B.Tech in Computer Science and Engineering',
      summary:
        'Published higher-education record for SRM Institute of Science and Technology, where Arjoneel completed his B.Tech in Computer Science and Engineering, graduating in May 2026.',
      score: {
        kind: 'cgpa',
        label: 'CGPA',
        value: '8.2',
      },
      tags: ['Computer Science and Engineering'],
    },
    {
      id: 'edu-navyug-class-xii',
      institution: 'Navyug Convent Sr. Secondary School',
      period: 'Apr 2021 - Mar 2022',
      qualification: 'CBSE Class XII',
      summary:
        'Published school record for CBSE Class XII at Navyug Convent Sr. Secondary School.',
      score: {
        kind: 'percentage',
        label: 'Percentage',
        value: '70.8%',
      },
      tags: ['CBSE Class XII'],
    },
    {
      id: 'edu-amity-class-x',
      institution: 'Amity International School, Sector 46',
      period: 'Feb 2019 - Mar 2020',
      qualification: 'CBSE Class X',
      summary:
        'Published school record for CBSE Class X at Amity International School, Sector 46.',
      score: {
        kind: 'percentage',
        label: 'Percentage',
        value: '89.8%',
      },
      tags: ['CBSE Class X'],
    },
  ],
};

export const educationRecords = profileRecord.education;
export const contactMethods: ContactMethod[] = [];
