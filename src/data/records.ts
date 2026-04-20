import { AchievementRecord, KnowledgeEntry } from '../types';
import ieeePdf from '../assets/project-previews/IEEE.pdf';
import awsAcademyMachineLearningFoundationPdf from '../assets/project-previews/achiev/AWS_Academy_Machine_Learning_Foundation.pdf';
import computerVisionEssentialCourseCertificatePdf from '../assets/project-previews/achiev/Computer_Vision_Essential_Course_Certificate.pdf';
import deepLearningCertificatePdf from '../assets/project-previews/achiev/DIP_DeepLearning.pdf';
import machineLearningCertificatePdf from '../assets/project-previews/achiev/DIP_MachineLearning.pdf';
import genesisCertificatePdf from '../assets/project-previews/achiev/HackathonGENESIS1.0.pdf';
import hackathonCertificatePdf from '../assets/project-previews/achiev/Hackathon_Certificate.pdf';
import isroCertificatePdf from '../assets/project-previews/achiev/ISRO_OnlineCourse.pdf';
import matlabOnrampCertificatePdf from '../assets/project-previews/achiev/Matlab_onramp.pdf';
import munsocCertificatePdf from '../assets/project-previews/achiev/MUNSOC.pdf';
import serviceNowCadPdf from '../assets/project-previews/achiev/ServiceNowCAD.pdf';
import serviceNowCsaPdf from '../assets/project-previews/achiev/ServiceNowCSA.pdf';

export const globalCertificationRecords: AchievementRecord[] = [
  {
    id: 'cert-servicenow-cad',
    type: 'Certification',
    title: 'ServiceNow Certified Application Developer (CAD)',
    issuer: 'ServiceNow',
    date: '2025',
    note: 'ServiceNow certification for Certified Application Developer, issued May 03, 2025, certification number 27087361.',
    link: serviceNowCadPdf,
    bucket: 'global-certifications',
  },
  {
    id: 'cert-servicenow-csa',
    type: 'Certification',
    title: 'ServiceNow Certified System Administrator (CSA)',
    issuer: 'ServiceNow',
    date: '2025',
    note: 'ServiceNow certification for Certified System Administrator, issued January 23, 2025, certification number 26606029.',
    link: serviceNowCsaPdf,
    bucket: 'global-certifications',
  },
];

export const certificateRecords: AchievementRecord[] = [
  {
    id: 'cert-aws-academy-ml-foundations',
    type: 'Certification',
    title: 'AWS Academy Machine Learning Foundations',
    issuer: 'AWS Academy',
    date: '2024',
    note: 'AWS Academy certificate asset for Machine Learning Foundations. The PDF text shows a 20-hour certificate dated 02/12/2024.',
    link: awsAcademyMachineLearningFoundationPdf,
    bucket: 'certificates',
  },
  {
    id: 'cert-isro-geodata',
    type: 'Certification',
    title: 'Geo-data Sharing and Cyber Security',
    issuer: 'IIRS / ISRO',
    date: '2023',
    note: 'Online course certificate with 100% attendance recorded on the certificate.',
    link: isroCertificatePdf,
    bucket: 'certificates',
  },
  {
    id: 'cert-matlab-dl',
    type: 'Certification',
    title: 'Deep Learning Onramp',
    issuer: 'MathWorks',
    date: '2024',
    note: 'MathWorks training certificate for Deep Learning Onramp.',
    link: deepLearningCertificatePdf,
    bucket: 'certificates',
  },
  {
    id: 'cert-matlab-fundamentals',
    type: 'Certification',
    title: 'Machine Learning Onramp',
    issuer: 'MathWorks',
    date: '2024',
    note: 'MathWorks training certificate for Machine Learning Onramp.',
    link: machineLearningCertificatePdf,
    bucket: 'certificates',
  },
  {
    id: 'cert-matlab-onramp',
    type: 'Certification',
    title: 'MATLAB Onramp',
    issuer: 'MathWorks',
    date: '2024',
    note: 'MathWorks introductory MATLAB training certificate.',
    link: matlabOnrampCertificatePdf,
    bucket: 'certificates',
  },
  {
    id: 'cert-computer-vision-essential-course',
    type: 'Certification',
    title: 'Computer Vision Essential Course',
    issuer: 'Provider not specified in current repo data',
    date: '2024',
    note: 'Course certificate asset present in the achievements folder. The current repo data does not safely identify the provider, so the wording stays conservative.',
    link: computerVisionEssentialCourseCertificatePdf,
    bucket: 'certificates',
  },
  {
    id: 'ach-hackathon-genesis',
    type: 'Achievement',
    title: 'Hackathon GENESIS 1.0',
    issuer: 'GENESIS 1.0',
    date: '2024',
    note: 'Participation certificate for Hackathon GENESIS 1.0.',
    link: genesisCertificatePdf,
    bucket: 'certificates',
  },
  {
    id: 'ach-hackathon-certificate',
    type: 'Achievement',
    title: 'Hackathon Certificate',
    issuer: 'Event issuer not specified in current repo data',
    date: 'Undated asset',
    note: 'Hackathon certificate asset present in the achievements folder. The current repo data does not safely identify the issuing event, so the wording stays conservative.',
    link: hackathonCertificatePdf,
    bucket: 'certificates',
  },
  {
    id: 'ach-munsoc',
    type: 'Achievement',
    title: 'SRMMUN Society Certificate',
    issuer: 'SRMMUN Society',
    date: '2024',
    note: 'Certificate-backed university society record used as supporting leadership evidence.',
    link: munsocCertificatePdf,
    bucket: 'certificates',
  },
];

export const certificationRecords: AchievementRecord[] = [
  ...globalCertificationRecords,
  ...certificateRecords.filter((record) => record.type === 'Certification'),
];

export const achievementRecords: AchievementRecord[] = certificateRecords.filter(
  (record) => record.type === 'Achievement'
);

export const publicationRecords: AchievementRecord[] = [
  {
    id: 'pub-agrifore-ieee',
    type: 'Publication',
    title: 'AgriFore: Data-Driven Agricultural Market and Yield Modeling for Kamareddy District, Telangana',
    issuer: 'IEEE-format manuscript',
    date: 'Undated manuscript',
    note: 'IEEE-format research manuscript listing Arjoneel Ghosh among the authors. The paper focuses on agricultural market and yield modeling for Kamareddy District, Telangana. This record is intentionally framed as a manuscript rather than a confirmed publication.',
    link: ieeePdf,
  },
];

export const labKnowledgeEntries: KnowledgeEntry[] = [
  {
    id: 'lab-paper-agrifore',
    section: 'Papers',
    title: 'AgriFore IEEE Manuscript',
    summary:
      'IEEE-format manuscript aligned with the AgriFore project and focused on agricultural market and yield modeling for Kamareddy District, Telangana.',
    status: 'Manuscript',
    tags: ['agricultural-forecasting', 'market-modeling', 'yield-modeling'],
  },
  {
    id: 'lab-concept-quota-sampler',
    section: 'Concepts',
    title: 'Quota-Based Iterative Balancing Sampler',
    summary:
      'Exploration of quota balancing logic for ServiceNow case datasets, with attention to fallback handling, grouped constraints, and configuration-driven execution.',
    status: 'Applied concept',
    tags: ['sampling', 'data-tooling', 'ServiceNow'],
  },
  {
    id: 'lab-exp-sign-recognition',
    section: 'Experiments',
    title: 'Real-Time Sign Language Recognition',
    summary:
      'Live sign-recognition experiment built around webcam input, MediaPipe Hands landmarks, per-language Keras classifiers, and prediction smoothing.',
    status: 'Experiment',
    tags: ['computer-vision', 'MediaPipe', 'assistive-tech'],
  },
  {
    id: 'lab-proto-agrifore-dashboard',
    section: 'Prototypes',
    title: 'Agricultural Market Intelligence Dashboard',
    summary:
      'Prototype dashboard layer for exploring agricultural market context, trend views, and prediction-oriented workflows around the AgriFore system.',
    status: 'Prototype',
    tags: ['FastAPI', 'dashboard', 'forecasting'],
  },
];
