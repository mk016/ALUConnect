// This file contains mock data for colleges and alumni profiles for development purposes

// Types for our data structures
export interface College {
  id: number;
  name: string;
  logo: string;
  coverPhoto: string;
  location: string;
  founded: number;
  type: string;
  website: string;
  email: string;
  description: string;
  rankings: Array<{
    name: string;
    rank: string;
    year: number;
  }>;
  programs: Array<{
    id: number;
    name: string;
    type: string;
    duration: string;
  }>;
  stats: {
    students: number;
    faculty: number;
    alumniCount: number;
    internationalStudents: string;
    acceptanceRate: string;
  };
}

export interface Education {
  id: number;
  degree: string;
  institution: string;
  gradYear: number;
}

export interface Experience {
  id: number;
  role: string;
  company: string;
  startDate: string;
  endDate: string;
  description: string;
}

export interface Project {
  id: number;
  title: string;
  description: string;
  link: string;
}

export interface Alumni {
  id: number;
  name: string;
  avatar: string;
  coverPhoto: string;
  graduationYear: number;
  degree: string;
  collegeId: number;
  collegeName: string;
  company: string;
  position: string;
  location: string;
  email: string;
  linkedin: string;
  bio: string;
  skills: string[];
  experiences: Experience[];
  education: Education[];
  projects: Project[];
}

// Original data
export const collegesData = [
  {
    id: 1,
    name: "Stanford University",
    logo: "https://source.unsplash.com/random/200x200/?university,logo,stanford",
    coverPhoto: "https://source.unsplash.com/random/1920x400/?university,campus,stanford",
    location: "Stanford, CA",
    founded: 1885,
    type: "Private Research University",
    website: "https://www.stanford.edu",
    email: "admissions@stanford.edu",
    description: "Stanford University is a private research university in Stanford, California. The university was founded in 1885 by Leland and Jane Stanford in memory of their only child, Leland Stanford Jr., who had died of typhoid fever at age 15 the previous year.",
    rankings: [
      { name: "QS World University Rankings", rank: "3rd", year: 2023 },
      { name: "Times Higher Education", rank: "4th", year: 2023 },
      { name: "US News & World Report", rank: "6th", year: 2023 }
    ],
    programs: [
      { id: 1, name: "Computer Science", type: "Undergraduate", duration: "4 years" },
      { id: 2, name: "Electrical Engineering", type: "Undergraduate", duration: "4 years" },
      { id: 3, name: "Business Administration", type: "Graduate", duration: "2 years" },
      { id: 4, name: "Medicine", type: "Graduate", duration: "4 years" }
    ],
    stats: {
      students: 16520,
      faculty: 2300,
      alumniCount: 220000,
      internationalStudents: "23%",
      acceptanceRate: "4.3%"
    }
  },
  {
    id: 2,
    name: "Massachusetts Institute of Technology",
    logo: "https://source.unsplash.com/random/200x200/?university,logo,mit",
    coverPhoto: "https://source.unsplash.com/random/1920x400/?university,campus,mit",
    location: "Cambridge, MA",
    founded: 1861,
    type: "Private Research University",
    website: "https://www.mit.edu",
    email: "admissions@mit.edu",
    description: "The Massachusetts Institute of Technology (MIT) is a private land-grant research university in Cambridge, Massachusetts. Established in 1861, MIT has played a significant role in the development of many areas of modern technology and science.",
    rankings: [
      { name: "QS World University Rankings", rank: "1st", year: 2023 },
      { name: "Times Higher Education", rank: "5th", year: 2023 },
      { name: "US News & World Report", rank: "3rd", year: 2023 }
    ],
    programs: [
      { id: 1, name: "Aerospace Engineering", type: "Undergraduate", duration: "4 years" },
      { id: 2, name: "Computer Science", type: "Undergraduate", duration: "4 years" },
      { id: 3, name: "Physics", type: "Graduate", duration: "5 years" },
      { id: 4, name: "Economics", type: "Graduate", duration: "2 years" }
    ],
    stats: {
      students: 11520,
      faculty: 1800,
      alumniCount: 139000,
      internationalStudents: "29%",
      acceptanceRate: "6.7%"
    }
  },
  {
    id: 3,
    name: "Harvard University",
    logo: "https://source.unsplash.com/random/200x200/?university,logo,harvard",
    coverPhoto: "https://source.unsplash.com/random/1920x400/?university,campus,harvard",
    location: "Cambridge, MA",
    founded: 1636,
    type: "Private Ivy League University",
    website: "https://www.harvard.edu",
    email: "admissions@harvard.edu",
    description: "Harvard University is a private Ivy League research university in Cambridge, Massachusetts. Founded in 1636, Harvard is the oldest institution of higher learning in the United States and among the most prestigious in the world.",
    rankings: [
      { name: "QS World University Rankings", rank: "5th", year: 2023 },
      { name: "Times Higher Education", rank: "2nd", year: 2023 },
      { name: "US News & World Report", rank: "2nd", year: 2023 }
    ],
    programs: [
      { id: 1, name: "Law", type: "Graduate", duration: "3 years" },
      { id: 2, name: "Business", type: "Graduate", duration: "2 years" },
      { id: 3, name: "Liberal Arts", type: "Undergraduate", duration: "4 years" },
      { id: 4, name: "Medicine", type: "Graduate", duration: "4 years" }
    ],
    stats: {
      students: 21000,
      faculty: 2400,
      alumniCount: 371000,
      internationalStudents: "24%",
      acceptanceRate: "4.0%"
    }
  },
  {
    id: 4,
    name: "University of California, Berkeley",
    logo: "https://source.unsplash.com/random/200x200/?university,logo,berkeley",
    coverPhoto: "https://source.unsplash.com/random/1920x400/?university,campus,berkeley",
    location: "Berkeley, CA",
    founded: 1868,
    type: "Public Research University",
    website: "https://www.berkeley.edu",
    email: "admissions@berkeley.edu",
    description: "The University of California, Berkeley is a public land-grant research university in Berkeley, California. Established in 1868, it is the state's first land-grant university and the first campus of the University of California system.",
    rankings: [
      { name: "QS World University Rankings", rank: "30th", year: 2023 },
      { name: "Times Higher Education", rank: "8th", year: 2023 },
      { name: "US News & World Report", rank: "20th", year: 2023 }
    ],
    programs: [
      { id: 1, name: "Computer Science", type: "Undergraduate", duration: "4 years" },
      { id: 2, name: "Environmental Science", type: "Undergraduate", duration: "4 years" },
      { id: 3, name: "Business Administration", type: "Graduate", duration: "2 years" },
      { id: 4, name: "Engineering", type: "Graduate", duration: "2 years" }
    ],
    stats: {
      students: 42000,
      faculty: 1600,
      alumniCount: 500000,
      internationalStudents: "17%",
      acceptanceRate: "14.5%"
    }
  },
  {
    id: 5,
    name: "California Institute of Technology",
    logo: "https://source.unsplash.com/random/200x200/?university,logo,caltech",
    coverPhoto: "https://source.unsplash.com/random/1920x400/?university,campus,caltech",
    location: "Pasadena, CA",
    founded: 1891,
    type: "Private Research University",
    website: "https://www.caltech.edu",
    email: "admissions@caltech.edu",
    description: "The California Institute of Technology (Caltech) is a private research university in Pasadena, California. The university is known for its strength in science and engineering, and is one among a small group of institutes of technology in the United States which is primarily devoted to the instruction of pure and applied sciences.",
    rankings: [
      { name: "QS World University Rankings", rank: "6th", year: 2023 },
      { name: "Times Higher Education", rank: "3rd", year: 2023 },
      { name: "US News & World Report", rank: "9th", year: 2023 }
    ],
    programs: [
      { id: 1, name: "Physics", type: "Undergraduate", duration: "4 years" },
      { id: 2, name: "Astrophysics", type: "Graduate", duration: "5 years" },
      { id: 3, name: "Chemistry", type: "Undergraduate", duration: "4 years" },
      { id: 4, name: "Quantum Engineering", type: "Graduate", duration: "2 years" }
    ],
    stats: {
      students: 2200,
      faculty: 300,
      alumniCount: 24000,
      internationalStudents: "30%",
      acceptanceRate: "3.9%"
    }
  },
  {
    id: 6,
    name: "University of Oxford",
    logo: "https://source.unsplash.com/random/200x200/?university,logo,oxford",
    coverPhoto: "https://source.unsplash.com/random/1920x400/?university,campus,oxford",
    location: "Oxford, United Kingdom",
    founded: 1096,
    type: "Public Research University",
    website: "https://www.ox.ac.uk",
    email: "admissions@ox.ac.uk",
    description: "The University of Oxford is a collegiate research university in Oxford, England. It is the oldest university in the English-speaking world and the world's second-oldest university in continuous operation.",
    rankings: [
      { name: "QS World University Rankings", rank: "4th", year: 2023 },
      { name: "Times Higher Education", rank: "1st", year: 2023 },
      { name: "US News & World Report", rank: "5th", year: 2023 }
    ],
    programs: [
      { id: 1, name: "Philosophy, Politics and Economics", type: "Undergraduate", duration: "3 years" },
      { id: 2, name: "English Literature", type: "Undergraduate", duration: "3 years" },
      { id: 3, name: "Mathematics", type: "Undergraduate", duration: "4 years" },
      { id: 4, name: "Medical Sciences", type: "Graduate", duration: "4 years" }
    ],
    stats: {
      students: 24000,
      faculty: 1700,
      alumniCount: 300000,
      internationalStudents: "45%",
      acceptanceRate: "17.5%"
    }
  },
  {
    id: 7,
    name: "Yale University",
    logo: "https://source.unsplash.com/random/200x200/?university,logo,yale",
    coverPhoto: "https://source.unsplash.com/random/1920x400/?university,campus,yale",
    location: "New Haven, CT",
    founded: 1701,
    type: "Private Ivy League University",
    website: "https://www.yale.edu",
    email: "admissions@yale.edu",
    description: "Yale University is a private Ivy League research university in New Haven, Connecticut. Founded in 1701, Yale is the third-oldest institution of higher education in the United States and one of the nine Colonial Colleges chartered before the American Revolution.",
    rankings: [
      { name: "QS World University Rankings", rank: "16th", year: 2023 },
      { name: "Times Higher Education", rank: "9th", year: 2023 },
      { name: "US News & World Report", rank: "4th", year: 2023 }
    ],
    programs: [
      { id: 1, name: "History", type: "Undergraduate", duration: "4 years" },
      { id: 2, name: "Political Science", type: "Undergraduate", duration: "4 years" },
      { id: 3, name: "Drama", type: "Graduate", duration: "3 years" },
      { id: 4, name: "Law", type: "Graduate", duration: "3 years" }
    ],
    stats: {
      students: 13000,
      faculty: 4500,
      alumniCount: 170000,
      internationalStudents: "22%",
      acceptanceRate: "5.9%"
    }
  },
  {
    id: 8,
    name: "University of Cambridge",
    logo: "https://source.unsplash.com/random/200x200/?university,logo,cambridge",
    coverPhoto: "https://source.unsplash.com/random/1920x400/?university,campus,cambridge",
    location: "Cambridge, United Kingdom",
    founded: 1209,
    type: "Public Research University",
    website: "https://www.cam.ac.uk",
    email: "admissions@cam.ac.uk",
    description: "The University of Cambridge is a collegiate research university in Cambridge, United Kingdom. Founded in 1209, the University of Cambridge is the world's third-oldest university in continuous operation.",
    rankings: [
      { name: "QS World University Rankings", rank: "2nd", year: 2023 },
      { name: "Times Higher Education", rank: "3rd", year: 2023 },
      { name: "US News & World Report", rank: "8th", year: 2023 }
    ],
    programs: [
      { id: 1, name: "Natural Sciences", type: "Undergraduate", duration: "3 years" },
      { id: 2, name: "Engineering", type: "Undergraduate", duration: "4 years" },
      { id: 3, name: "Mathematics", type: "Undergraduate", duration: "3 years" },
      { id: 4, name: "Computer Science", type: "Graduate", duration: "1 year" }
    ],
    stats: {
      students: 20000,
      faculty: 1500,
      alumniCount: 250000,
      internationalStudents: "38%",
      acceptanceRate: "20.5%"
    }
  },
  {
    id: 9,
    name: "Princeton University",
    logo: "https://source.unsplash.com/random/200x200/?university,logo,princeton",
    coverPhoto: "https://source.unsplash.com/random/1920x400/?university,campus,princeton",
    location: "Princeton, NJ",
    founded: 1746,
    type: "Private Ivy League University",
    website: "https://www.princeton.edu",
    email: "admissions@princeton.edu",
    description: "Princeton University is a private Ivy League research university in Princeton, New Jersey. Founded in 1746, Princeton is the fourth-oldest institution of higher education in the United States and one of the nine colonial colleges chartered before the American Revolution.",
    rankings: [
      { name: "QS World University Rankings", rank: "16th", year: 2023 },
      { name: "Times Higher Education", rank: "7th", year: 2023 },
      { name: "US News & World Report", rank: "1st", year: 2023 }
    ],
    programs: [
      { id: 1, name: "Public and International Affairs", type: "Undergraduate", duration: "4 years" },
      { id: 2, name: "Economics", type: "Undergraduate", duration: "4 years" },
      { id: 3, name: "Applied Mathematics", type: "Graduate", duration: "2 years" },
      { id: 4, name: "Architecture", type: "Graduate", duration: "2 years" }
    ],
    stats: {
      students: 8000,
      faculty: 1200,
      alumniCount: 95000,
      internationalStudents: "23%",
      acceptanceRate: "5.5%"
    }
  },
  {
    id: 10,
    name: "Cornell University",
    logo: "https://source.unsplash.com/random/200x200/?university,logo,cornell",
    coverPhoto: "https://source.unsplash.com/random/1920x400/?university,campus,cornell",
    location: "Ithaca, NY",
    founded: 1865,
    type: "Private Ivy League University",
    website: "https://www.cornell.edu",
    email: "admissions@cornell.edu",
    description: "Cornell University is a private Ivy League and statutory land-grant research university based in Ithaca, New York. Founded in 1865, Cornell was intended to teach and make contributions in all fields of knowledge—from the classics to the sciences, and from the theoretical to the applied.",
    rankings: [
      { name: "QS World University Rankings", rank: "20th", year: 2023 },
      { name: "Times Higher Education", rank: "22nd", year: 2023 },
      { name: "US News & World Report", rank: "17th", year: 2023 }
    ],
    programs: [
      { id: 1, name: "Agriculture", type: "Undergraduate", duration: "4 years" },
      { id: 2, name: "Hotel Administration", type: "Undergraduate", duration: "4 years" },
      { id: 3, name: "Veterinary Medicine", type: "Graduate", duration: "4 years" },
      { id: 4, name: "Architecture", type: "Graduate", duration: "3 years" }
    ],
    stats: {
      students: 24000,
      faculty: 1650,
      alumniCount: 250000,
      internationalStudents: "24%",
      acceptanceRate: "10.7%"
    }
  },
  {
    id: 11,
    name: "Columbia University",
    logo: "https://source.unsplash.com/random/200x200/?university,logo,columbia",
    coverPhoto: "https://source.unsplash.com/random/1920x400/?university,campus,columbia",
    location: "New York, NY",
    founded: 1754,
    type: "Private Ivy League University",
    website: "https://www.columbia.edu",
    email: "admissions@columbia.edu",
    description: "Columbia University is a private Ivy League research university in New York City. Established in 1754 as King's College, Columbia is the oldest institution of higher education in New York and the fifth-oldest institution of higher learning in the United States.",
    rankings: [
      { name: "QS World University Rankings", rank: "22nd", year: 2023 },
      { name: "Times Higher Education", rank: "11th", year: 2023 },
      { name: "US News & World Report", rank: "18th", year: 2023 }
    ],
    programs: [
      { id: 1, name: "Journalism", type: "Graduate", duration: "1 year" },
      { id: 2, name: "Political Science", type: "Undergraduate", duration: "4 years" },
      { id: 3, name: "Film Studies", type: "Undergraduate", duration: "4 years" },
      { id: 4, name: "Business", type: "Graduate", duration: "2 years" }
    ],
    stats: {
      students: 31000,
      faculty: 4500,
      alumniCount: 340000,
      internationalStudents: "36%",
      acceptanceRate: "5.1%"
    }
  },
  {
    id: 12,
    name: "University of Tokyo",
    logo: "https://source.unsplash.com/random/200x200/?university,logo,tokyo",
    coverPhoto: "https://source.unsplash.com/random/1920x400/?university,campus,tokyo",
    location: "Tokyo, Japan",
    founded: 1877,
    type: "Public Research University",
    website: "https://www.u-tokyo.ac.jp/en/",
    email: "admissions@adm.u-tokyo.ac.jp",
    description: "The University of Tokyo, abbreviated as Todai, is a public research university located in Tokyo, Japan. Established in 1877, it is the oldest and most prestigious university in Japan. The university has 10 faculties, 15 graduate schools, and enrolls about 30,000 students.",
    rankings: [
      { name: "QS World University Rankings", rank: "23rd", year: 2023 },
      { name: "Times Higher Education", rank: "35th", year: 2023 },
      { name: "US News & World Report", rank: "74th", year: 2023 }
    ],
    programs: [
      { id: 1, name: "Engineering", type: "Undergraduate", duration: "4 years" },
      { id: 2, name: "Law", type: "Undergraduate", duration: "4 years" },
      { id: 3, name: "Medicine", type: "Graduate", duration: "4 years" },
      { id: 4, name: "Science", type: "Graduate", duration: "2 years" }
    ],
    stats: {
      students: 28000,
      faculty: 2300,
      alumniCount: 160000,
      internationalStudents: "15%",
      acceptanceRate: "33%"
    }
  },
  {
    id: 13,
    name: "ETH Zurich",
    logo: "https://source.unsplash.com/random/200x200/?university,logo,eth",
    coverPhoto: "https://source.unsplash.com/random/1920x400/?university,campus,zurich",
    location: "Zurich, Switzerland",
    founded: 1855,
    type: "Public Research University",
    website: "https://ethz.ch/en.html",
    email: "admissions@ethz.ch",
    description: "ETH Zurich is a public research university in the city of Zürich, Switzerland. Founded in 1855, ETH Zurich is a science, technology, engineering, and mathematics university. Like its sister institution EPFL, it is an integral part of the Swiss Federal Institutes of Technology Domain.",
    rankings: [
      { name: "QS World University Rankings", rank: "9th", year: 2023 },
      { name: "Times Higher Education", rank: "15th", year: 2023 },
      { name: "US News & World Report", rank: "26th", year: 2023 }
    ],
    programs: [
      { id: 1, name: "Mechanical Engineering", type: "Undergraduate", duration: "3 years" },
      { id: 2, name: "Computer Science", type: "Undergraduate", duration: "3 years" },
      { id: 3, name: "Architecture", type: "Graduate", duration: "2 years" },
      { id: 4, name: "Physics", type: "Graduate", duration: "2 years" }
    ],
    stats: {
      students: 22000,
      faculty: 2800,
      alumniCount: 120000,
      internationalStudents: "41%",
      acceptanceRate: "27%"
    }
  },
  {
    id: 14,
    name: "National University of Singapore",
    logo: "https://source.unsplash.com/random/200x200/?university,logo,singapore",
    coverPhoto: "https://source.unsplash.com/random/1920x400/?university,campus,singapore",
    location: "Singapore",
    founded: 1905,
    type: "Public Research University",
    website: "https://www.nus.edu.sg",
    email: "admissions@nus.edu.sg",
    description: "The National University of Singapore (NUS) is a national research university in Singapore. Founded in 1905, it is the oldest autonomous university in the country. NUS is a comprehensive research university, offering a wide range of disciplines, including sciences, medicine and dentistry, design and environment, law, arts and social sciences, engineering, business, computing, and music.",
    rankings: [
      { name: "QS World University Rankings", rank: "11th", year: 2023 },
      { name: "Times Higher Education", rank: "19th", year: 2023 },
      { name: "US News & World Report", rank: "34th", year: 2023 }
    ],
    programs: [
      { id: 1, name: "Computer Science", type: "Undergraduate", duration: "4 years" },
      { id: 2, name: "Business Analytics", type: "Undergraduate", duration: "4 years" },
      { id: 3, name: "Medicine", type: "Graduate", duration: "5 years" },
      { id: 4, name: "Law", type: "Graduate", duration: "3 years" }
    ],
    stats: {
      students: 38000,
      faculty: 2400,
      alumniCount: 300000,
      internationalStudents: "25%",
      acceptanceRate: "5%"
    }
  },
  {
    id: 15,
    name: "University of Michigan",
    logo: "https://source.unsplash.com/random/200x200/?university,logo,michigan",
    coverPhoto: "https://source.unsplash.com/random/1920x400/?university,campus,michigan",
    location: "Ann Arbor, MI",
    founded: 1817,
    type: "Public Research University",
    website: "https://umich.edu",
    email: "admissions@umich.edu",
    description: "The University of Michigan is a public research university in Ann Arbor, Michigan. Founded in 1817, the university is the oldest in Michigan. The University of Michigan is one of the top public universities in the United States, with over 100 top-10 graduate programs.",
    rankings: [
      { name: "QS World University Rankings", rank: "23rd", year: 2023 },
      { name: "Times Higher Education", rank: "24th", year: 2023 },
      { name: "US News & World Report", rank: "23rd", year: 2023 }
    ],
    programs: [
      { id: 1, name: "Business", type: "Undergraduate", duration: "4 years" },
      { id: 2, name: "Engineering", type: "Undergraduate", duration: "4 years" },
      { id: 3, name: "Dentistry", type: "Graduate", duration: "4 years" },
      { id: 4, name: "Public Health", type: "Graduate", duration: "2 years" }
    ],
    stats: {
      students: 47000,
      faculty: 8700,
      alumniCount: 630000,
      internationalStudents: "15%",
      acceptanceRate: "20.2%"
    }
  },
  {
    id: 16,
    name: "Tsinghua University",
    logo: "https://source.unsplash.com/random/200x200/?university,logo,tsinghua",
    coverPhoto: "https://source.unsplash.com/random/1920x400/?university,campus,tsinghua",
    location: "Beijing, China",
    founded: 1911,
    type: "Public Research University",
    website: "https://www.tsinghua.edu.cn/en/",
    email: "admissions@tsinghua.edu.cn",
    description: "Tsinghua University is a major research university in Beijing, and a member of the C9 League of Chinese universities. Since its establishment in 1911, it has graduated numerous Chinese leaders in politics, business, academia, and culture.",
    rankings: [
      { name: "QS World University Rankings", rank: "14th", year: 2023 },
      { name: "Times Higher Education", rank: "16th", year: 2023 },
      { name: "US News & World Report", rank: "36th", year: 2023 }
    ],
    programs: [
      { id: 1, name: "Engineering", type: "Undergraduate", duration: "4 years" },
      { id: 2, name: "Economics", type: "Undergraduate", duration: "4 years" },
      { id: 3, name: "Computer Science", type: "Graduate", duration: "3 years" },
      { id: 4, name: "Architecture", type: "Graduate", duration: "3 years" }
    ],
    stats: {
      students: 36000,
      faculty: 3400,
      alumniCount: 200000,
      internationalStudents: "8%",
      acceptanceRate: "2%"
    }
  },
  {
    id: 17,
    name: "University of Toronto",
    logo: "https://source.unsplash.com/random/200x200/?university,logo,toronto",
    coverPhoto: "https://source.unsplash.com/random/1920x400/?university,campus,toronto",
    location: "Toronto, Canada",
    founded: 1827,
    type: "Public Research University",
    website: "https://www.utoronto.ca",
    email: "admissions@utoronto.ca",
    description: "The University of Toronto is a public research university in Toronto, Ontario, Canada. Founded by royal charter in 1827, the university is the oldest in the province of Ontario, and known worldwide for its engineering and medicine programs.",
    rankings: [
      { name: "QS World University Rankings", rank: "25th", year: 2023 },
      { name: "Times Higher Education", rank: "18th", year: 2023 },
      { name: "US News & World Report", rank: "16th", year: 2023 }
    ],
    programs: [
      { id: 1, name: "Computer Engineering", type: "Undergraduate", duration: "4 years" },
      { id: 2, name: "Life Sciences", type: "Undergraduate", duration: "4 years" },
      { id: 3, name: "Medicine", type: "Graduate", duration: "4 years" },
      { id: 4, name: "MBA", type: "Graduate", duration: "2 years" }
    ],
    stats: {
      students: 93000,
      faculty: 14700,
      alumniCount: 610000,
      internationalStudents: "26%",
      acceptanceRate: "43%"
    }
  },
  {
    id: 18,
    name: "University of Chicago",
    logo: "https://source.unsplash.com/random/200x200/?university,logo,chicago",
    coverPhoto: "https://source.unsplash.com/random/1920x400/?university,campus,chicago",
    location: "Chicago, IL",
    founded: 1890,
    type: "Private Research University",
    website: "https://www.uchicago.edu",
    email: "admissions@uchicago.edu",
    description: "The University of Chicago is a private research university in Chicago, Illinois. The university is composed of an undergraduate college and various graduate programs and interdisciplinary committees. It is consistently ranked among the best universities in the world, and it has many prominent alumni.",
    rankings: [
      { name: "QS World University Rankings", rank: "10th", year: 2023 },
      { name: "Times Higher Education", rank: "10th", year: 2023 },
      { name: "US News & World Report", rank: "6th", year: 2023 }
    ],
    programs: [
      { id: 1, name: "Economics", type: "Undergraduate", duration: "4 years" },
      { id: 2, name: "Mathematics", type: "Undergraduate", duration: "4 years" },
      { id: 3, name: "Law", type: "Graduate", duration: "3 years" },
      { id: 4, name: "Business", type: "Graduate", duration: "2 years" }
    ],
    stats: {
      students: 17000,
      faculty: 2600,
      alumniCount: 190000,
      internationalStudents: "30%",
      acceptanceRate: "5.9%"
    }
  },
  {
    id: 19,
    name: "Technical University of Munich",
    logo: "https://source.unsplash.com/random/200x200/?university,logo,munich",
    coverPhoto: "https://source.unsplash.com/random/1920x400/?university,campus,munich",
    location: "Munich, Germany",
    founded: 1868,
    type: "Public Research University",
    website: "https://www.tum.de/en/",
    email: "admissions@tum.de",
    description: "The Technical University of Munich is a public research university in Munich, Germany. It is a member of TU9, an association of the most prestigious and top German Institutes of Technology. TUM is consistently ranked among the leading technical universities in Europe, both in research and in teaching.",
    rankings: [
      { name: "QS World University Rankings", rank: "49th", year: 2023 },
      { name: "Times Higher Education", rank: "38th", year: 2023 },
      { name: "US News & World Report", rank: "46th", year: 2023 }
    ],
    programs: [
      { id: 1, name: "Mechanical Engineering", type: "Undergraduate", duration: "3 years" },
      { id: 2, name: "Computer Science", type: "Undergraduate", duration: "3 years" },
      { id: 3, name: "Electrical Engineering", type: "Graduate", duration: "2 years" },
      { id: 4, name: "Chemistry", type: "Graduate", duration: "2 years" }
    ],
    stats: {
      students: 47000,
      faculty: 6700,
      alumniCount: 250000,
      internationalStudents: "32%",
      acceptanceRate: "12%"
    }
  },
  {
    id: 20,
    name: "University of Sydney",
    logo: "https://source.unsplash.com/random/200x200/?university,logo,sydney",
    coverPhoto: "https://source.unsplash.com/random/1920x400/?university,campus,sydney",
    location: "Sydney, Australia",
    founded: 1850,
    type: "Public Research University",
    website: "https://www.sydney.edu.au",
    email: "admissions@sydney.edu.au",
    description: "The University of Sydney is a public research university located in Sydney, Australia. Founded in 1850, it is Australia's first university and is regarded as one of the world's leading universities. The university is known for its beautiful sandstone buildings and campuses.",
    rankings: [
      { name: "QS World University Rankings", rank: "41st", year: 2023 },
      { name: "Times Higher Education", rank: "54th", year: 2023 },
      { name: "US News & World Report", rank: "62nd", year: 2023 }
    ],
    programs: [
      { id: 1, name: "Medicine", type: "Graduate", duration: "4 years" },
      { id: 2, name: "Law", type: "Undergraduate", duration: "4 years" },
      { id: 3, name: "Business", type: "Undergraduate", duration: "3 years" },
      { id: 4, name: "Engineering", type: "Graduate", duration: "2 years" }
    ],
    stats: {
      students: 73000,
      faculty: 8000,
      alumniCount: 400000,
      internationalStudents: "38%",
      acceptanceRate: "30%"
    }
  }
];

export const alumniData = [
  {
    id: 1,
    name: "Alex Johnson",
    avatar: "https://source.unsplash.com/random/200x200/?portrait,man,1",
    coverPhoto: "https://source.unsplash.com/random/1920x400/?university",
    graduationYear: 2018,
    degree: "Bachelor of Science in Computer Science",
    collegeId: 1, // Stanford
    collegeName: "Stanford University",
    company: "Google",
    position: "Software Engineer",
    location: "San Francisco, CA",
    email: "alex.johnson@example.com",
    linkedin: "https://linkedin.com/in/alexjohnson",
    bio: "Software engineer with 5+ years of experience in full-stack development. Passionate about building scalable web applications and mentoring junior developers.",
    skills: ["JavaScript", "React", "Node.js", "Python", "AWS", "TypeScript"],
    experiences: [
      {
        id: 1,
        role: "Software Engineer",
        company: "Google",
        startDate: "Jan 2020",
        endDate: "Present",
        description: "Working on Google Search infrastructure."
      },
      {
        id: 2,
        role: "Junior Developer",
        company: "Facebook",
        startDate: "Aug 2018",
        endDate: "Dec 2019",
        description: "Worked on internal tools for content moderation."
      }
    ],
    education: [
      {
        id: 1,
        degree: "Bachelor of Science in Computer Science",
        institution: "Stanford University",
        gradYear: 2018
      }
    ],
    projects: [
      {
        id: 1,
        title: "E-commerce Platform",
        description: "Built a full-stack e-commerce platform using React, Node.js, and MongoDB.",
        link: "#"
      },
      {
        id: 2,
        title: "AI Chat Assistant",
        description: "Developed a conversational AI assistant using Python and TensorFlow.",
        link: "#"
      }
    ]
  },
  {
    id: 2,
    name: "Sophia Chen",
    avatar: "https://source.unsplash.com/random/200x200/?portrait,woman,2",
    coverPhoto: "https://source.unsplash.com/random/1920x400/?university,2",
    graduationYear: 2019,
    degree: "Master of Business Administration",
    collegeId: 3, // Harvard
    collegeName: "Harvard University",
    company: "McKinsey & Company",
    position: "Management Consultant",
    location: "Boston, MA",
    email: "sophia.chen@example.com",
    linkedin: "https://linkedin.com/in/sophiachen",
    bio: "Management consultant with expertise in digital transformation and strategy. Passionate about helping organizations leverage technology to drive business growth.",
    skills: ["Strategy", "Business Analysis", "Digital Transformation", "Project Management", "Leadership", "Data Analysis"],
    experiences: [
      {
        id: 1,
        role: "Management Consultant",
        company: "McKinsey & Company",
        startDate: "Jun 2019",
        endDate: "Present",
        description: "Consulting on digital transformation projects for Fortune 500 clients."
      },
      {
        id: 2,
        role: "Summer Associate",
        company: "Goldman Sachs",
        startDate: "May 2018",
        endDate: "Aug 2018",
        description: "Worked in the investment banking division on M&A transactions."
      }
    ],
    education: [
      {
        id: 1,
        degree: "Master of Business Administration",
        institution: "Harvard University",
        gradYear: 2019
      },
      {
        id: 2,
        degree: "Bachelor of Arts in Economics",
        institution: "Yale University",
        gradYear: 2017
      }
    ],
    projects: [
      {
        id: 1,
        title: "Healthcare Digital Transformation",
        description: "Led a project to digitize patient records for a major healthcare provider.",
        link: "#"
      },
      {
        id: 2,
        title: "Retail Strategy Overhaul",
        description: "Developed a new e-commerce strategy for a traditional retail chain.",
        link: "#"
      }
    ]
  },
  {
    id: 3,
    name: "Marcus Williams",
    avatar: "https://source.unsplash.com/random/200x200/?portrait,man,3",
    coverPhoto: "https://source.unsplash.com/random/1920x400/?university,3",
    graduationYear: 2020,
    degree: "Ph.D. in Physics",
    collegeId: 2, // MIT
    collegeName: "Massachusetts Institute of Technology",
    company: "SpaceX",
    position: "Research Scientist",
    location: "Los Angeles, CA",
    email: "marcus.williams@example.com",
    linkedin: "https://linkedin.com/in/marcuswilliams",
    bio: "Physicist specializing in propulsion systems for space exploration. Currently developing next-generation rocket engines for interplanetary travel.",
    skills: ["Propulsion Physics", "Thermodynamics", "Fluid Dynamics", "Materials Science", "Python", "MATLAB"],
    experiences: [
      {
        id: 1,
        role: "Research Scientist",
        company: "SpaceX",
        startDate: "Sep 2020",
        endDate: "Present",
        description: "Leading research on advanced propulsion systems for Mars missions."
      },
      {
        id: 2,
        role: "Research Assistant",
        company: "MIT Research Laboratory",
        startDate: "Jan 2017",
        endDate: "Aug 2020",
        description: "Conducted research on plasma physics and fusion energy."
      }
    ],
    education: [
      {
        id: 1,
        degree: "Ph.D. in Physics",
        institution: "Massachusetts Institute of Technology",
        gradYear: 2020
      },
      {
        id: 2,
        degree: "Master of Science in Physics",
        institution: "California Institute of Technology",
        gradYear: 2016
      },
      {
        id: 3,
        degree: "Bachelor of Science in Physics",
        institution: "University of Michigan",
        gradYear: 2014
      }
    ],
    projects: [
      {
        id: 1,
        title: "Ion Propulsion System",
        description: "Developed a novel ion propulsion system for long-duration space missions.",
        link: "#"
      },
      {
        id: 2,
        title: "Plasma Confinement Mechanism",
        description: "Designed an improved magnetic confinement system for fusion reactions.",
        link: "#"
      }
    ]
  },
  {
    id: 4,
    name: "Emma Rodriguez",
    avatar: "https://source.unsplash.com/random/200x200/?portrait,woman,4",
    coverPhoto: "https://source.unsplash.com/random/1920x400/?university,4",
    graduationYear: 2017,
    degree: "Bachelor of Arts in Law",
    collegeId: 7, // Yale
    collegeName: "Yale University",
    company: "Human Rights Watch",
    position: "Human Rights Lawyer",
    location: "New York, NY",
    email: "emma.rodriguez@example.com",
    linkedin: "https://linkedin.com/in/emmarodriguez",
    bio: "Human rights lawyer focusing on refugee and immigration cases. Passionate about social justice and advocacy for marginalized communities.",
    skills: ["Immigration Law", "Human Rights Law", "Legal Research", "Advocacy", "Public Speaking", "Negotiation"],
    experiences: [
      {
        id: 1,
        role: "Human Rights Lawyer",
        company: "Human Rights Watch",
        startDate: "Mar 2019",
        endDate: "Present",
        description: "Advocating for refugee rights and documenting human rights violations."
      },
      {
        id: 2,
        role: "Associate Attorney",
        company: "Immigration Legal Aid Society",
        startDate: "Jul 2017",
        endDate: "Feb 2019",
        description: "Provided legal assistance to immigrants and asylum seekers."
      }
    ],
    education: [
      {
        id: 1,
        degree: "Juris Doctor (J.D.)",
        institution: "Yale Law School",
        gradYear: 2017
      },
      {
        id: 2,
        degree: "Bachelor of Arts in Political Science",
        institution: "Columbia University",
        gradYear: 2014
      }
    ],
    projects: [
      {
        id: 1,
        title: "Refugee Rights Initiative",
        description: "Led a project documenting human rights abuses against refugees in border detention facilities.",
        link: "#"
      },
      {
        id: 2,
        title: "Immigration Policy Reform",
        description: "Contributed to policy papers on reforming immigration detention practices.",
        link: "#"
      }
    ]
  },
  {
    id: 5,
    name: "David Kim",
    avatar: "https://source.unsplash.com/random/200x200/?portrait,man,5",
    coverPhoto: "https://source.unsplash.com/random/1920x400/?university,5",
    graduationYear: 2016,
    degree: "Master of Fine Arts",
    collegeId: 11, // Columbia
    collegeName: "Columbia University",
    company: "Netflix",
    position: "Film Director",
    location: "Los Angeles, CA",
    email: "david.kim@example.com",
    linkedin: "https://linkedin.com/in/davidkim",
    bio: "Award-winning film director with a focus on documentary storytelling. Passionate about using film to highlight social issues and underrepresented communities.",
    skills: ["Directing", "Screenwriting", "Film Production", "Documentary", "Editing", "Visual Storytelling"],
    experiences: [
      {
        id: 1,
        role: "Film Director",
        company: "Netflix",
        startDate: "Jan 2021",
        endDate: "Present",
        description: "Directing documentary series and films for the streaming platform."
      },
      {
        id: 2,
        role: "Independent Filmmaker",
        company: "Self-employed",
        startDate: "Jun 2016",
        endDate: "Dec 2020",
        description: "Created independent documentary films featured in major film festivals."
      }
    ],
    education: [
      {
        id: 1,
        degree: "Master of Fine Arts in Film",
        institution: "Columbia University",
        gradYear: 2016
      },
      {
        id: 2,
        degree: "Bachelor of Arts in Communication",
        institution: "University of California, Berkeley",
        gradYear: 2014
      }
    ],
    projects: [
      {
        id: 1,
        title: "Unseen America",
        description: "Directed an award-winning documentary about rural American communities affected by economic change.",
        link: "#"
      },
      {
        id: 2,
        title: "Beyond Borders",
        description: "Created a documentary series on immigration stories across different cultures.",
        link: "#"
      }
    ]
  },
  {
    id: 6,
    name: "Priya Patel",
    avatar: "https://source.unsplash.com/random/200x200/?portrait,woman,6",
    coverPhoto: "https://source.unsplash.com/random/1920x400/?university,6",
    graduationYear: 2015,
    degree: "Bachelor of Science in Computer Engineering",
    collegeId: 4, // UC Berkeley
    collegeName: "University of California, Berkeley",
    company: "Tesla",
    position: "Robotics Engineer",
    location: "Fremont, CA",
    email: "priya.patel@example.com",
    linkedin: "https://linkedin.com/in/priyapatel",
    bio: "Robotics engineer specializing in automation systems for manufacturing. Currently working on advanced robotics for electric vehicle production.",
    skills: ["Robotics", "Automation", "Python", "C++", "ROS", "Computer Vision", "Machine Learning"],
    experiences: [
      {
        id: 1,
        role: "Robotics Engineer",
        company: "Tesla",
        startDate: "Aug 2018",
        endDate: "Present",
        description: "Developing autonomous robotics systems for vehicle assembly lines."
      },
      {
        id: 2,
        role: "Automation Engineer",
        company: "Boston Dynamics",
        startDate: "Jul 2015",
        endDate: "Jul 2018",
        description: "Worked on control systems for quadruped and humanoid robots."
      }
    ],
    education: [
      {
        id: 1,
        degree: "Bachelor of Science in Computer Engineering",
        institution: "University of California, Berkeley",
        gradYear: 2015
      }
    ],
    projects: [
      {
        id: 1,
        title: "Adaptive Robot Arm",
        description: "Designed a robotic arm system that adapts to changing manufacturing environments.",
        link: "#"
      },
      {
        id: 2,
        title: "Computer Vision for Robotics",
        description: "Implemented advanced computer vision algorithms for robot navigation in complex environments.",
        link: "#"
      }
    ]
  },
  {
    id: 7,
    name: "James Wilson",
    avatar: "https://source.unsplash.com/random/200x200/?portrait,man,7",
    coverPhoto: "https://source.unsplash.com/random/1920x400/?university,7",
    graduationYear: 2022,
    degree: "Master of Science in Artificial Intelligence",
    collegeId: 5, // Caltech
    collegeName: "California Institute of Technology",
    company: "DeepMind",
    position: "AI Research Scientist",
    location: "London, UK",
    email: "james.wilson@example.com",
    linkedin: "https://linkedin.com/in/jameswilson",
    bio: "AI researcher focusing on reinforcement learning and neural networks. Published author in top AI conferences and passionate about advancing the field of machine learning.",
    skills: ["Deep Learning", "Reinforcement Learning", "Neural Networks", "TensorFlow", "PyTorch", "Python", "Research"],
    experiences: [
      {
        id: 1,
        role: "AI Research Scientist",
        company: "DeepMind",
        startDate: "Sep 2022",
        endDate: "Present",
        description: "Conducting cutting-edge research in reinforcement learning algorithms."
      },
      {
        id: 2,
        role: "AI Research Intern",
        company: "OpenAI",
        startDate: "Jun 2021",
        endDate: "Aug 2022",
        description: "Worked on language models and generative AI systems."
      }
    ],
    education: [
      {
        id: 1,
        degree: "Master of Science in Artificial Intelligence",
        institution: "California Institute of Technology",
        gradYear: 2022
      },
      {
        id: 2,
        degree: "Bachelor of Science in Computer Science",
        institution: "University of Washington",
        gradYear: 2020
      }
    ],
    projects: [
      {
        id: 1,
        title: "Reinforcement Learning for Robotics",
        description: "Developed a reinforcement learning framework for robot manipulation tasks.",
        link: "#"
      },
      {
        id: 2,
        title: "Neural Network Interpretability",
        description: "Created methods to visualize and interpret complex neural network decisions.",
        link: "#"
      }
    ]
  },
  {
    id: 8,
    name: "Olivia Martinez",
    avatar: "https://source.unsplash.com/random/200x200/?portrait,woman,8",
    coverPhoto: "https://source.unsplash.com/random/1920x400/?university,8",
    graduationYear: 2014,
    degree: "Doctor of Medicine",
    collegeId: 3, // Harvard
    collegeName: "Harvard University",
    company: "Mayo Clinic",
    position: "Neurosurgeon",
    location: "Rochester, MN",
    email: "olivia.martinez@example.com",
    linkedin: "https://linkedin.com/in/oliviamartinez",
    bio: "Neurosurgeon specializing in minimally invasive brain surgery techniques. Passionate about advancing surgical methods and improving patient outcomes in complex neurological cases.",
    skills: ["Neurosurgery", "Minimally Invasive Surgery", "Medical Research", "Clinical Leadership", "Patient Care", "Medical Education"],
    experiences: [
      {
        id: 1,
        role: "Neurosurgeon",
        company: "Mayo Clinic",
        startDate: "Jul 2020",
        endDate: "Present",
        description: "Performing complex brain surgeries and conducting clinical research."
      },
      {
        id: 2,
        role: "Neurosurgery Fellow",
        company: "Johns Hopkins Hospital",
        startDate: "Jul 2018",
        endDate: "Jun 2020",
        description: "Completed specialized fellowship in minimally invasive neurosurgery."
      },
      {
        id: 3,
        role: "Neurosurgery Resident",
        company: "Massachusetts General Hospital",
        startDate: "Jul 2014",
        endDate: "Jun 2018",
        description: "Completed residency training in general neurosurgery."
      }
    ],
    education: [
      {
        id: 1,
        degree: "Doctor of Medicine",
        institution: "Harvard Medical School",
        gradYear: 2014
      },
      {
        id: 2,
        degree: "Bachelor of Science in Neuroscience",
        institution: "Duke University",
        gradYear: 2010
      }
    ],
    projects: [
      {
        id: 1,
        title: "Novel Neurosurgical Techniques",
        description: "Developed new minimally invasive approaches for deep brain tumors.",
        link: "#"
      },
      {
        id: 2,
        title: "Brain Imaging Research",
        description: "Led research on advanced imaging techniques for surgical planning.",
        link: "#"
      }
    ]
  },
  {
    id: 9,
    name: "Mohammed Al-Farsi",
    avatar: "https://source.unsplash.com/random/200x200/?portrait,man,9",
    coverPhoto: "https://source.unsplash.com/random/1920x400/?university,9",
    graduationYear: 2016,
    degree: "Master of Science in Civil Engineering",
    collegeId: 6, // Oxford
    collegeName: "University of Oxford",
    company: "Arup",
    position: "Structural Engineer",
    location: "Dubai, UAE",
    email: "mohammed.alfarsi@example.com",
    linkedin: "https://linkedin.com/in/mohammedalfarsi",
    bio: "Structural engineer specializing in sustainable building design for extreme environments. Leading projects across the Middle East with a focus on energy efficiency and resilience.",
    skills: ["Structural Engineering", "Sustainable Design", "BIM", "AutoCAD", "Civil Engineering", "Project Management", "LEED"],
    experiences: [
      {
        id: 1,
        role: "Structural Engineer",
        company: "Arup",
        startDate: "Jan 2019",
        endDate: "Present",
        description: "Leading structural design for major infrastructure projects in the Middle East."
      },
      {
        id: 2,
        role: "Junior Engineer",
        company: "Foster + Partners",
        startDate: "Sep 2016",
        endDate: "Dec 2018",
        description: "Worked on structural design for commercial and residential buildings."
      }
    ],
    education: [
      {
        id: 1,
        degree: "Master of Science in Civil Engineering",
        institution: "University of Oxford",
        gradYear: 2016
      },
      {
        id: 2,
        degree: "Bachelor of Engineering in Civil Engineering",
        institution: "American University of Sharjah",
        gradYear: 2014
      }
    ],
    projects: [
      {
        id: 1,
        title: "Sustainable Desert Tower",
        description: "Led structural design for a 50-story tower with innovative cooling systems for desert climate.",
        link: "#"
      },
      {
        id: 2,
        title: "Earthquake-Resistant Hospital",
        description: "Designed structural systems for a major hospital in a seismic zone.",
        link: "#"
      }
    ]
  },
  {
    id: 10,
    name: "Julia Thompson",
    avatar: "https://source.unsplash.com/random/200x200/?portrait,woman,10",
    coverPhoto: "https://source.unsplash.com/random/1920x400/?university,10",
    graduationYear: 2019,
    degree: "Ph.D. in Environmental Science",
    collegeId: 4, // UC Berkeley
    collegeName: "University of California, Berkeley",
    company: "World Wildlife Fund",
    position: "Environmental Scientist",
    location: "Washington, DC",
    email: "julia.thompson@example.com",
    linkedin: "https://linkedin.com/in/juliathompson",
    bio: "Environmental scientist with expertise in climate change adaptation and ecosystem conservation. Currently leading projects to protect endangered habitats and species.",
    skills: ["Environmental Science", "Climate Modeling", "Conservation Biology", "GIS", "Data Analysis", "Scientific Research", "Policy Development"],
    experiences: [
      {
        id: 1,
        role: "Environmental Scientist",
        company: "World Wildlife Fund",
        startDate: "Oct 2019",
        endDate: "Present",
        description: "Leading conservation projects and climate adaptation strategies."
      },
      {
        id: 2,
        role: "Research Assistant",
        company: "National Oceanic and Atmospheric Administration",
        startDate: "Jan 2017",
        endDate: "Sep 2019",
        description: "Conducted research on climate change impacts on marine ecosystems."
      }
    ],
    education: [
      {
        id: 1,
        degree: "Ph.D. in Environmental Science",
        institution: "University of California, Berkeley",
        gradYear: 2019
      },
      {
        id: 2,
        degree: "Master of Science in Ecology",
        institution: "University of Michigan",
        gradYear: 2016
      },
      {
        id: 3,
        degree: "Bachelor of Science in Biology",
        institution: "University of Washington",
        gradYear: 2014
      }
    ],
    projects: [
      {
        id: 1,
        title: "Coral Reef Conservation",
        description: "Developed climate adaptation strategies for endangered coral reef ecosystems.",
        link: "#"
      },
      {
        id: 2,
        title: "Amazon Rainforest Protection",
        description: "Led a project to protect biodiversity hotspots in the Amazon basin.",
        link: "#"
      }
    ]
  },
  {
    id: 11,
    name: "Thomas Lee",
    avatar: "https://source.unsplash.com/random/200x200/?portrait,man,11",
    coverPhoto: "https://source.unsplash.com/random/1920x400/?university,11",
    graduationYear: 2020,
    degree: "Master of Architecture",
    collegeId: 10, // Cornell
    collegeName: "Cornell University",
    company: "Foster + Partners",
    position: "Architect",
    location: "London, UK",
    email: "thomas.lee@example.com",
    linkedin: "https://linkedin.com/in/thomaslee",
    bio: "Architect focused on sustainable urban design and adaptive reuse of historic buildings. Passionate about creating spaces that blend tradition with innovation.",
    skills: ["Architecture", "Sustainable Design", "Urban Planning", "3D Modeling", "Revit", "AutoCAD", "Historic Preservation"],
    experiences: [
      {
        id: 1,
        role: "Architect",
        company: "Foster + Partners",
        startDate: "Nov 2020",
        endDate: "Present",
        description: "Designing sustainable commercial and cultural buildings globally."
      },
      {
        id: 2,
        role: "Architectural Designer",
        company: "SOM",
        startDate: "Jun 2020",
        endDate: "Oct 2020",
        description: "Worked on concept design for mixed-use urban developments."
      }
    ],
    education: [
      {
        id: 1,
        degree: "Master of Architecture",
        institution: "Cornell University",
        gradYear: 2020
      },
      {
        id: 2,
        degree: "Bachelor of Arts in Urban Studies",
        institution: "Yale University",
        gradYear: 2018
      }
    ],
    projects: [
      {
        id: 1,
        title: "Sustainable Urban Housing",
        description: "Designed a net-zero energy affordable housing complex in urban setting.",
        link: "#"
      },
      {
        id: 2,
        title: "Historic Factory Conversion",
        description: "Led the adaptive reuse of a historic factory into a modern arts center.",
        link: "#"
      }
    ]
  },
  {
    id: 12,
    name: "Sarah Johnson",
    avatar: "https://source.unsplash.com/random/200x200/?portrait,woman,12",
    coverPhoto: "https://source.unsplash.com/random/1920x400/?university,12",
    graduationYear: 2017,
    degree: "Master of Public Health",
    collegeId: 15, // University of Michigan
    collegeName: "University of Michigan",
    company: "Centers for Disease Control and Prevention",
    position: "Epidemiologist",
    location: "Atlanta, GA",
    email: "sarah.johnson@example.com",
    linkedin: "https://linkedin.com/in/sarahjohnson",
    bio: "Epidemiologist specializing in infectious disease surveillance and outbreak response. Currently working on global health security and pandemic preparedness.",
    skills: ["Epidemiology", "Public Health", "Disease Surveillance", "Biostatistics", "Outbreak Investigation", "R Programming", "Global Health"],
    experiences: [
      {
        id: 1,
        role: "Epidemiologist",
        company: "Centers for Disease Control and Prevention",
        startDate: "May 2018",
        endDate: "Present",
        description: "Leading infectious disease surveillance and outbreak investigations."
      },
      {
        id: 2,
        role: "Public Health Analyst",
        company: "World Health Organization",
        startDate: "Jul 2017",
        endDate: "Apr 2018",
        description: "Worked on global disease monitoring and health emergency response."
      }
    ],
    education: [
      {
        id: 1,
        degree: "Master of Public Health",
        institution: "University of Michigan",
        gradYear: 2017
      },
      {
        id: 2,
        degree: "Bachelor of Science in Microbiology",
        institution: "University of Wisconsin",
        gradYear: 2015
      }
    ],
    projects: [
      {
        id: 1,
        title: "Pandemic Response Protocols",
        description: "Developed updated protocols for early detection and response to novel pathogens.",
        link: "#"
      },
      {
        id: 2,
        title: "Vector-Borne Disease Surveillance",
        description: "Implemented improved surveillance systems for mosquito-borne diseases in urban areas.",
        link: "#"
      }
    ]
  },
  {
    id: 13,
    name: "Daniel Nakamura",
    avatar: "https://source.unsplash.com/random/200x200/?portrait,man,13",
    coverPhoto: "https://source.unsplash.com/random/1920x400/?university,13",
    graduationYear: 2021,
    degree: "Bachelor of Arts in Music Composition",
    collegeId: 7, // Yale
    collegeName: "Yale University",
    company: "Sony Music",
    position: "Film Composer",
    location: "Los Angeles, CA",
    email: "daniel.nakamura@example.com",
    linkedin: "https://linkedin.com/in/danielnakamura",
    bio: "Film composer and producer specializing in blending orchestral and electronic music for visual media. Award-winning contributor to independent and studio productions.",
    skills: ["Music Composition", "Film Scoring", "Orchestration", "Sound Design", "Logic Pro", "Ableton Live", "Piano"],
    experiences: [
      {
        id: 1,
        role: "Film Composer",
        company: "Sony Music",
        startDate: "Feb 2022",
        endDate: "Present",
        description: "Composing and producing music for film and television projects."
      },
      {
        id: 2,
        role: "Assistant Composer",
        company: "Hans Zimmer Studio",
        startDate: "Jun 2021",
        endDate: "Jan 2022",
        description: "Assisted on major film soundtrack productions."
      }
    ],
    education: [
      {
        id: 1,
        degree: "Bachelor of Arts in Music Composition",
        institution: "Yale University",
        gradYear: 2021
      }
    ],
    projects: [
      {
        id: 1,
        title: "Orchestral Film Score",
        description: "Composed and orchestrated the score for an award-winning independent film.",
        link: "#"
      },
      {
        id: 2,
        title: "Electronic Music Album",
        description: "Produced an album of electronic music that was featured in multiple TV series.",
        link: "#"
      }
    ]
  },
  {
    id: 14,
    name: "Elena Volkov",
    avatar: "https://source.unsplash.com/random/200x200/?portrait,woman,14",
    coverPhoto: "https://source.unsplash.com/random/1920x400/?university,14",
    graduationYear: 2018,
    degree: "Master of Science in Quantum Physics",
    collegeId: 2, // MIT
    collegeName: "Massachusetts Institute of Technology",
    company: "IBM Quantum",
    position: "Quantum Physicist",
    location: "Yorktown Heights, NY",
    email: "elena.volkov@example.com",
    linkedin: "https://linkedin.com/in/elenavolkov",
    bio: "Quantum physicist working on quantum computing algorithms and applications. Passionate about bridging the gap between theoretical quantum physics and practical computing solutions.",
    skills: ["Quantum Physics", "Quantum Computing", "Quantum Algorithms", "Python", "Linear Algebra", "Machine Learning", "Qiskit"],
    experiences: [
      {
        id: 1,
        role: "Quantum Physicist",
        company: "IBM Quantum",
        startDate: "Dec 2018",
        endDate: "Present",
        description: "Researching and developing quantum algorithms for practical applications."
      },
      {
        id: 2,
        role: "Research Assistant",
        company: "MIT Quantum Information Lab",
        startDate: "Sep 2016",
        endDate: "Nov 2018",
        description: "Conducted research on quantum error correction and fault tolerance."
      }
    ],
    education: [
      {
        id: 1,
        degree: "Master of Science in Quantum Physics",
        institution: "Massachusetts Institute of Technology",
        gradYear: 2018
      },
      {
        id: 2,
        degree: "Bachelor of Science in Physics",
        institution: "Moscow State University",
        gradYear: 2016
      }
    ],
    projects: [
      {
        id: 1,
        title: "Quantum Machine Learning Algorithm",
        description: "Developed a quantum algorithm that speeds up specific machine learning tasks.",
        link: "#"
      },
      {
        id: 2,
        title: "Quantum Error Mitigation",
        description: "Designed new error mitigation techniques for NISQ-era quantum computers.",
        link: "#"
      }
    ]
  },
  {
    id: 15,
    name: "Gabriel Santos",
    avatar: "https://source.unsplash.com/random/200x200/?portrait,man,15",
    coverPhoto: "https://source.unsplash.com/random/1920x400/?university,15",
    graduationYear: 2019,
    degree: "MBA in Entrepreneurship",
    collegeId: 1, // Stanford
    collegeName: "Stanford University",
    company: "GreenTech Innovations",
    position: "Founder & CEO",
    location: "San Francisco, CA",
    email: "gabriel.santos@example.com",
    linkedin: "https://linkedin.com/in/gabrielsantos",
    bio: "Entrepreneur and investor focused on sustainable technology startups. Founded GreenTech Innovations to accelerate the adoption of clean energy solutions worldwide.",
    skills: ["Entrepreneurship", "Venture Capital", "Renewable Energy", "Business Strategy", "Public Speaking", "Fundraising", "Sustainable Development"],
    experiences: [
      {
        id: 1,
        role: "Founder & CEO",
        company: "GreenTech Innovations",
        startDate: "Jan 2020",
        endDate: "Present",
        description: "Leading a cleantech startup focused on affordable renewable energy solutions."
      },
      {
        id: 2,
        role: "Venture Partner",
        company: "Sequoia Capital",
        startDate: "Jun 2019",
        endDate: "Dec 2019",
        description: "Evaluated and invested in early-stage startups in the sustainability sector."
      }
    ],
    education: [
      {
        id: 1,
        degree: "MBA in Entrepreneurship",
        institution: "Stanford Graduate School of Business",
        gradYear: 2019
      },
      {
        id: 2,
        degree: "Bachelor of Science in Environmental Engineering",
        institution: "University of São Paulo",
        gradYear: 2017
      }
    ],
    projects: [
      {
        id: 1,
        title: "Solar Desalination",
        description: "Developed an affordable solar-powered water desalination system for coastal communities.",
        link: "#"
      },
      {
        id: 2,
        title: "Circular Economy Marketplace",
        description: "Created a platform connecting businesses to reuse industrial waste materials.",
        link: "#"
      }
    ]
  },
  {
    id: 16,
    name: "Aisha Hassan",
    avatar: "https://source.unsplash.com/random/200x200/?portrait,woman,16",
    coverPhoto: "https://source.unsplash.com/random/1920x400/?university,16",
    graduationYear: 2016,
    degree: "Master of Education",
    collegeId: 8, // Cambridge
    collegeName: "University of Cambridge",
    company: "UNESCO",
    position: "Education Policy Specialist",
    location: "Paris, France",
    email: "aisha.hassan@example.com",
    linkedin: "https://linkedin.com/in/aishahassan",
    bio: "Education policy specialist with a focus on improving access to quality education in developing countries. Passionate about educational technology and innovative teaching methods.",
    skills: ["Education Policy", "International Development", "Program Evaluation", "Curriculum Design", "Educational Technology", "Grant Writing", "Arabic"],
    experiences: [
      {
        id: 1,
        role: "Education Policy Specialist",
        company: "UNESCO",
        startDate: "Jul 2018",
        endDate: "Present",
        description: "Developing and implementing education policies for developing nations."
      },
      {
        id: 2,
        role: "Education Consultant",
        company: "Save the Children",
        startDate: "Sep 2016",
        endDate: "Jun 2018",
        description: "Worked on educational programs in refugee camps and conflict zones."
      }
    ],
    education: [
      {
        id: 1,
        degree: "Master of Education",
        institution: "University of Cambridge",
        gradYear: 2016
      },
      {
        id: 2,
        degree: "Bachelor of Arts in International Relations",
        institution: "American University in Cairo",
        gradYear: 2014
      }
    ],
    projects: [
      {
        id: 1,
        title: "Digital Learning Initiative",
        description: "Led the implementation of tablet-based learning in schools across five African countries.",
        link: "#"
      },
      {
        id: 2,
        title: "Teacher Training Program",
        description: "Developed a comprehensive training program for educators in rural communities.",
        link: "#"
      }
    ]
  },
  {
    id: 17,
    name: "Robert Chen",
    avatar: "https://source.unsplash.com/random/200x200/?portrait,man,17",
    coverPhoto: "https://source.unsplash.com/random/1920x400/?university,17",
    graduationYear: 2015,
    degree: "Ph.D. in Biomedical Engineering",
    collegeId: 9, // Princeton
    collegeName: "Princeton University",
    company: "Johnson & Johnson",
    position: "Principal Research Scientist",
    location: "Boston, MA",
    email: "robert.chen@example.com",
    linkedin: "https://linkedin.com/in/robertchen",
    bio: "Biomedical engineer specializing in drug delivery systems and medical devices. Leading research on targeted therapeutic delivery for cancer treatment.",
    skills: ["Biomedical Engineering", "Drug Delivery", "Nanotechnology", "Clinical Trials", "Molecular Biology", "Patent Development", "Research Management"],
    experiences: [
      {
        id: 1,
        role: "Principal Research Scientist",
        company: "Johnson & Johnson",
        startDate: "Feb 2019",
        endDate: "Present",
        description: "Leading R&D for advanced drug delivery systems and medical devices."
      },
      {
        id: 2,
        role: "Research Scientist",
        company: "Genentech",
        startDate: "Jun 2015",
        endDate: "Jan 2019",
        description: "Developed targeted therapeutics for oncology applications."
      }
    ],
    education: [
      {
        id: 1,
        degree: "Ph.D. in Biomedical Engineering",
        institution: "Princeton University",
        gradYear: 2015
      },
      {
        id: 2,
        degree: "Bachelor of Science in Chemical Engineering",
        institution: "University of California, Berkeley",
        gradYear: 2011
      }
    ],
    projects: [
      {
        id: 1,
        title: "Nanoparticle Drug Delivery",
        description: "Developed a nanoparticle-based drug delivery system for cancer therapeutics.",
        link: "#"
      },
      {
        id: 2,
        title: "Implantable Medical Device",
        description: "Created a biodegradable implantable device for controlled drug release.",
        link: "#"
      }
    ]
  },
  {
    id: 18,
    name: "Isabella Rossi",
    avatar: "https://source.unsplash.com/random/200x200/?portrait,woman,18",
    coverPhoto: "https://source.unsplash.com/random/1920x400/?university,18",
    graduationYear: 2020,
    degree: "Master of Fine Arts in Fashion Design",
    collegeId: 11, // Columbia
    collegeName: "Columbia University",
    company: "Stella McCartney",
    position: "Sustainable Fashion Designer",
    location: "New York, NY",
    email: "isabella.rossi@example.com",
    linkedin: "https://linkedin.com/in/isabellarossi",
    bio: "Fashion designer specializing in sustainable and ethical fashion. Pioneering new approaches to eco-friendly textiles and production methods.",
    skills: ["Fashion Design", "Sustainable Textiles", "Pattern Making", "Adobe Illustrator", "Trend Forecasting", "Zero-Waste Design", "Italian"],
    experiences: [
      {
        id: 1,
        role: "Sustainable Fashion Designer",
        company: "Stella McCartney",
        startDate: "Sep 2020",
        endDate: "Present",
        description: "Designing sustainable luxury fashion collections."
      },
      {
        id: 2,
        role: "Design Intern",
        company: "Patagonia",
        startDate: "Jan 2020",
        endDate: "Aug 2020",
        description: "Worked on sustainable outdoor apparel designs and materials."
      }
    ],
    education: [
      {
        id: 1,
        degree: "Master of Fine Arts in Fashion Design",
        institution: "Columbia University School of the Arts",
        gradYear: 2020
      },
      {
        id: 2,
        degree: "Bachelor of Arts in Design",
        institution: "Politecnico di Milano",
        gradYear: 2018
      }
    ],
    projects: [
      {
        id: 1,
        title: "Biodegradable Fashion Collection",
        description: "Created a fully biodegradable collection using innovative natural materials.",
        link: "#"
      },
      {
        id: 2,
        title: "Upcycled Luxury",
        description: "Designed a luxury collection made entirely from upcycled textile waste.",
        link: "#"
      }
    ]
  },
  {
    id: 19,
    name: "Jonathan Park",
    avatar: "https://source.unsplash.com/random/200x200/?portrait,man,19",
    coverPhoto: "https://source.unsplash.com/random/1920x400/?university,19",
    graduationYear: 2017,
    degree: "Master of Business Administration",
    collegeId: 10, // Cornell
    collegeName: "Cornell University",
    company: "Goldman Sachs",
    position: "Investment Banking Associate",
    location: "New York, NY",
    email: "jonathan.park@example.com",
    linkedin: "https://linkedin.com/in/jonathanpark",
    bio: "Investment banking professional specializing in technology mergers and acquisitions. Experienced in advising tech startups and Fortune 500 companies on strategic financial decisions.",
    skills: ["Investment Banking", "Financial Modeling", "Mergers & Acquisitions", "Valuation", "Due Diligence", "Excel", "PowerPoint"],
    experiences: [
      {
        id: 1,
        role: "Investment Banking Associate",
        company: "Goldman Sachs",
        startDate: "Aug 2017",
        endDate: "Present",
        description: "Advising technology clients on M&A transactions and capital raising."
      },
      {
        id: 2,
        role: "Summer Associate",
        company: "J.P. Morgan",
        startDate: "May 2016",
        endDate: "Aug 2016",
        description: "Worked in the technology investment banking group on various transactions."
      }
    ],
    education: [
      {
        id: 1,
        degree: "Master of Business Administration",
        institution: "Cornell University",
        gradYear: 2017
      },
      {
        id: 2,
        degree: "Bachelor of Science in Finance",
        institution: "New York University",
        gradYear: 2015
      }
    ],
    projects: [
      {
        id: 1,
        title: "Tech Startup Acquisition",
        description: "Advised on a $2.5 billion acquisition of an AI startup by a major tech company.",
        link: "#"
      },
      {
        id: 2,
        title: "IPO Advisory",
        description: "Led the financial modeling and valuation for a major tech IPO.",
        link: "#"
      }
    ]
  },
  {
    id: 20,
    name: "Maya Patel",
    avatar: "https://source.unsplash.com/random/200x200/?portrait,woman,20",
    coverPhoto: "https://source.unsplash.com/random/1920x400/?university,20",
    graduationYear: 2021,
    degree: "Ph.D. in Computer Science",
    collegeId: 16, // Tsinghua
    collegeName: "Tsinghua University",
    company: "Microsoft Research",
    position: "Research Scientist",
    location: "Beijing, China",
    email: "maya.patel@example.com",
    linkedin: "https://linkedin.com/in/mayapatel",
    bio: "Computer scientist specializing in natural language processing and multilingual AI systems. Currently researching cross-cultural language understanding and translation technologies.",
    skills: ["Natural Language Processing", "Machine Learning", "Python", "TensorFlow", "BERT", "Multilingual Computing", "Research"],
    experiences: [
      {
        id: 1,
        role: "Research Scientist",
        company: "Microsoft Research",
        startDate: "Jul 2021",
        endDate: "Present",
        description: "Conducting research on multilingual NLP and translation technologies."
      },
      {
        id: 2,
        role: "Research Intern",
        company: "Google AI",
        startDate: "Jun 2020",
        endDate: "Jun 2021",
        description: "Worked on natural language understanding for low-resource languages."
      }
    ],
    education: [
      {
        id: 1,
        degree: "Ph.D. in Computer Science",
        institution: "Tsinghua University",
        gradYear: 2021
      },
      {
        id: 2,
        degree: "Master of Science in Computer Science",
        institution: "Indian Institute of Technology",
        gradYear: 2018
      },
      {
        id: 3,
        degree: "Bachelor of Technology in Computer Science",
        institution: "University of Delhi",
        gradYear: 2016
      }
    ],
    projects: [
      {
        id: 1,
        title: "Multilingual Translation System",
        description: "Developed a neural machine translation system supporting 100+ languages.",
        link: "#"
      },
      {
        id: 2,
        title: "Cross-Cultural NLP",
        description: "Researched methods for understanding cultural context in language processing.",
        link: "#"
      }
    ]
  },
  {
    id: 21,
    name: "Carlos Mendoza",
    avatar: "https://source.unsplash.com/random/200x200/?portrait,man,21",
    coverPhoto: "https://source.unsplash.com/random/1920x400/?university,21",
    graduationYear: 2018,
    degree: "Master of Environmental Engineering",
    collegeId: 15, // University of Michigan
    collegeName: "University of Michigan",
    company: "Tesla",
    position: "Environmental Sustainability Manager",
    location: "Fremont, CA",
    email: "carlos.mendoza@example.com",
    linkedin: "https://linkedin.com/in/carlosmendoza",
    bio: "Environmental engineer focused on sustainable manufacturing and carbon footprint reduction. Currently leading initiatives to make automotive production more environmentally friendly.",
    skills: ["Environmental Engineering", "Sustainable Manufacturing", "Carbon Footprint Analysis", "Life Cycle Assessment", "Waste Reduction", "Environmental Compliance", "Spanish"],
    experiences: [
      {
        id: 1,
        role: "Environmental Sustainability Manager",
        company: "Tesla",
        startDate: "May 2020",
        endDate: "Present",
        description: "Leading sustainability initiatives across manufacturing operations."
      },
      {
        id: 2,
        role: "Environmental Engineer",
        company: "Ford Motor Company",
        startDate: "Jul 2018",
        endDate: "Apr 2020",
        description: "Implemented waste reduction and energy efficiency programs in manufacturing."
      }
    ],
    education: [
      {
        id: 1,
        degree: "Master of Environmental Engineering",
        institution: "University of Michigan",
        gradYear: 2018
      },
      {
        id: 2,
        degree: "Bachelor of Science in Civil Engineering",
        institution: "University of California, San Diego",
        gradYear: 2016
      }
    ],
    projects: [
      {
        id: 1,
        title: "Zero-Waste Manufacturing",
        description: "Led an initiative that reduced manufacturing waste by 75% at multiple facilities.",
        link: "#"
      },
      {
        id: 2,
        title: "Renewable Energy Integration",
        description: "Implemented solar power systems that provide 30% of factory energy needs.",
        link: "#"
      }
    ]
  },
  {
    id: 22,
    name: "Zoe Williams",
    avatar: "https://source.unsplash.com/random/200x200/?portrait,woman,22",
    coverPhoto: "https://source.unsplash.com/random/1920x400/?university,22",
    graduationYear: 2019,
    degree: "Bachelor of Science in Data Science",
    collegeId: 14, // National University of Singapore
    collegeName: "National University of Singapore",
    company: "Grab",
    position: "Data Scientist",
    location: "Singapore",
    email: "zoe.williams@example.com",
    linkedin: "https://linkedin.com/in/zoewilliams",
    bio: "Data scientist specializing in urban mobility and transportation optimization. Using machine learning to improve ride-sharing efficiency and reduce traffic congestion in Southeast Asian cities.",
    skills: ["Data Science", "Machine Learning", "Python", "R", "SQL", "Geospatial Analysis", "Time Series Forecasting"],
    experiences: [
      {
        id: 1,
        role: "Data Scientist",
        company: "Grab",
        startDate: "Oct 2019",
        endDate: "Present",
        description: "Developing algorithms to optimize ride-sharing and delivery services."
      },
      {
        id: 2,
        role: "Data Science Intern",
        company: "DBS Bank",
        startDate: "Jan 2019",
        endDate: "Sep 2019",
        description: "Worked on customer segmentation and financial fraud detection models."
      }
    ],
    education: [
      {
        id: 1,
        degree: "Bachelor of Science in Data Science",
        institution: "National University of Singapore",
        gradYear: 2019
      }
    ],
    projects: [
      {
        id: 1,
        title: "Urban Traffic Prediction",
        description: "Built a real-time traffic prediction system for major Southeast Asian cities.",
        link: "#"
      },
      {
        id: 2,
        title: "Ride-Sharing Optimization",
        description: "Developed algorithms that increased ride-sharing efficiency by 28%.",
        link: "#"
      }
    ]
  },
  {
    id: 23,
    name: "Benjamin Cohen",
    avatar: "https://source.unsplash.com/random/200x200/?portrait,man,23",
    coverPhoto: "https://source.unsplash.com/random/1920x400/?university,23",
    graduationYear: 2016,
    degree: "Doctor of Philosophy in Neuroscience",
    collegeId: 3, // Harvard
    collegeName: "Harvard University",
    company: "Neuralink",
    position: "Neural Interface Researcher",
    location: "San Francisco, CA",
    email: "benjamin.cohen@example.com",
    linkedin: "https://linkedin.com/in/benjamincohen",
    bio: "Neuroscientist working on brain-computer interfaces and neural prosthetics. Passionate about developing technologies that can help people with neurological conditions and advance human-computer interaction.",
    skills: ["Neuroscience", "Brain-Computer Interfaces", "Neural Engineering", "Electrophysiology", "Signal Processing", "MATLAB", "C++"],
    experiences: [
      {
        id: 1,
        role: "Neural Interface Researcher",
        company: "Neuralink",
        startDate: "Nov 2018",
        endDate: "Present",
        description: "Developing next-generation brain-computer interface technologies."
      },
      {
        id: 2,
        role: "Postdoctoral Researcher",
        company: "Stanford University",
        startDate: "Jul 2016",
        endDate: "Oct 2018",
        description: "Conducted research on neural prosthetics for motor function restoration."
      }
    ],
    education: [
      {
        id: 1,
        degree: "Doctor of Philosophy in Neuroscience",
        institution: "Harvard University",
        gradYear: 2016
      },
      {
        id: 2,
        degree: "Bachelor of Science in Biomedical Engineering",
        institution: "Johns Hopkins University",
        gradYear: 2012
      }
    ],
    projects: [
      {
        id: 1,
        title: "Neural Prosthetic Control",
        description: "Developed algorithms for improved control of robotic limbs through neural interfaces.",
        link: "#"
      },
      {
        id: 2,
        title: "Brain-Computer Interface",
        description: "Created a non-invasive BCI system for communication in paralyzed patients.",
        link: "#"
      }
    ]
  },
  {
    id: 24,
    name: "Fatima Al-Zahra",
    avatar: "https://source.unsplash.com/random/200x200/?portrait,woman,24",
    coverPhoto: "https://source.unsplash.com/random/1920x400/?university,24",
    graduationYear: 2017,
    degree: "Master of Science in Renewable Energy",
    collegeId: 19, // Technical University of Munich
    collegeName: "Technical University of Munich",
    company: "Siemens Energy",
    position: "Renewable Energy Engineer",
    location: "Munich, Germany",
    email: "fatima.alzahra@example.com",
    linkedin: "https://linkedin.com/in/fatimaalzahra",
    bio: "Renewable energy engineer specializing in wind energy systems and grid integration. Working on making renewable energy more reliable and accessible worldwide.",
    skills: ["Renewable Energy", "Wind Power", "Energy Storage", "Grid Integration", "Project Management", "AutoCAD", "SCADA Systems"],
    experiences: [
      {
        id: 1,
        role: "Renewable Energy Engineer",
        company: "Siemens Energy",
        startDate: "Jan 2018",
        endDate: "Present",
        description: "Designing and implementing wind energy projects across Europe and North Africa."
      },
      {
        id: 2,
        role: "Energy Consultant",
        company: "GIZ (German Development Agency)",
        startDate: "Aug 2017",
        endDate: "Dec 2017",
        description: "Consulted on renewable energy implementation in developing countries."
      }
    ],
    education: [
      {
        id: 1,
        degree: "Master of Science in Renewable Energy",
        institution: "Technical University of Munich",
        gradYear: 2017
      },
      {
        id: 2,
        degree: "Bachelor of Engineering in Electrical Engineering",
        institution: "Cairo University",
        gradYear: 2015
      }
    ],
    projects: [
      {
        id: 1,
        title: "Offshore Wind Farm",
        description: "Led the technical design for a 250MW offshore wind farm in the North Sea.",
        link: "#"
      },
      {
        id: 2,
        title: "Microgrid for Rural Areas",
        description: "Designed a solar-wind hybrid microgrid system for remote communities.",
        link: "#"
      }
    ]
  },
  {
    id: 25,
    name: "Jackson Brown",
    avatar: "https://source.unsplash.com/random/200x200/?portrait,man,25",
    coverPhoto: "https://source.unsplash.com/random/1920x400/?university,25",
    graduationYear: 2020,
    degree: "Bachelor of Laws",
    collegeId: 6, // Oxford
    collegeName: "University of Oxford",
    company: "Clifford Chance",
    position: "International Law Associate",
    location: "London, UK",
    email: "jackson.brown@example.com",
    linkedin: "https://linkedin.com/in/jacksonbrown",
    bio: "International lawyer specializing in technology law and data privacy. Advising global technology companies on cross-border legal compliance and intellectual property protection.",
    skills: ["International Law", "Data Privacy", "GDPR", "Intellectual Property", "Contract Negotiation", "Regulatory Compliance", "Technology Law"],
    experiences: [
      {
        id: 1,
        role: "International Law Associate",
        company: "Clifford Chance",
        startDate: "Oct 2020",
        endDate: "Present",
        description: "Advising technology clients on international law and data privacy matters."
      },
      {
        id: 2,
        role: "Legal Intern",
        company: "European Commission",
        startDate: "Mar 2020",
        endDate: "Sep 2020",
        description: "Worked on EU technology regulation and cross-border data transfer issues."
      }
    ],
    education: [
      {
        id: 1,
        degree: "Bachelor of Laws (LLB)",
        institution: "University of Oxford",
        gradYear: 2020
      },
      {
        id: 2,
        degree: "Bachelor of Arts in Philosophy",
        institution: "King's College London",
        gradYear: 2017
      }
    ],
    projects: [
      {
        id: 1,
        title: "Data Privacy Framework",
        description: "Developed a comprehensive GDPR compliance framework for tech companies.",
        link: "#"
      },
      {
        id: 2,
        title: "AI Regulation Analysis",
        description: "Conducted a comparative analysis of AI regulations across major jurisdictions.",
        link: "#"
      }
    ]
  }
];

// Export the data with the names expected by AlumniFinder
export const mockColleges = collegesData;
export const mockAlumni = alumniData;

