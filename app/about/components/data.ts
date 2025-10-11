import { Coffee, Users, Award, TrendingUp, Globe, Heart } from "lucide-react";
import dummyImg from "../../../public/dummyImg.png";

export const timeline = [
  {
    year: "2018",
    title: "The Beginning",
    description:
      "Kim Coffee was founded with a vision to showcase the rich heritage of Nigerian coffee to the world.",
    icon: Coffee,
    color: "from-amber-500 to-orange-500",
  },
  {
    year: "2019",
    title: "First Partnerships",
    description:
      "Established direct trade relationships with 50+ local coffee farmers across Nigeria.",
    icon: Users,
    color: "from-green-500 to-emerald-500",
  },
  {
    year: "2021",
    title: "Quality Recognition",
    description:
      "Received our first international quality certification and expanded to 5 major Nigerian cities.",
    icon: Award,
    color: "from-yellow-500 to-amber-500",
  },
  {
    year: "2023",
    title: "Community Impact",
    description:
      "Launched our farmer support program, improving livelihoods for over 200 farming families.",
    icon: Heart,
    color: "from-red-500 to-pink-500",
  },
  {
    year: "2024",
    title: "National Expansion",
    description:
      "Serving customers with same-day delivery in major cities nationwide.",
    icon: TrendingUp,
    color: "from-blue-500 to-indigo-500",
  },
  {
    year: "2025",
    title: "Dedication to Excellence",
    description:
      "Building a legacy of quality and community impact, with plans for international expansion.",
    icon: Globe,
    color: "from-purple-500 to-violet-500",
  },
];

export const team = [
  {
    name: "Mr Kim",
    role: "Founder & CEO",
    image: dummyImg,
    bio: "Passionate about coffee and community development, Kimberly founded Kim Coffee to showcase Nigerian coffee excellence.",
  },
  {
    name: "Jane Doe",
    role: "Operations Lead",
    image: dummyImg,
    bio: "Oversees our production and ensures our coffee beans maintain international quality standards.",
  },
  {
    name: "John Smith",
    role: "Marketing Director",
    image: dummyImg,
    bio: "Drives brand growth and helps share our story of sustainability and passion with the world.",
  },
];
