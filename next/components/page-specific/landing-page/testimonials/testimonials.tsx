import { BRAND_ICONS } from "@/components/brand-icons";
import { IconProps } from "@radix-ui/react-icons/dist/types";

export type Testimonial = {
  user: {
    avatar: string;
    name: {
      first: string;
      last?: string;
    };
    description?: string;
    at: string;
    link?: string;
  };

  text: string;
  rating: number; // 1-5
  isTruncated?: boolean;
  link: string;

  platform: TestimonialPlatform;
  date: string;
};

type TestimonialPlatform = {
  name: string;
  logo: (props: IconProps) => JSX.Element;
};

const PRODUCT_HUNT: TestimonialPlatform = {
  name: "Product Hunt",
  logo: BRAND_ICONS.ProductHunt,
};

const REDDIT: TestimonialPlatform = {
  name: "Reddit",
  logo: () => <img className="h-7" src="https://i.imgur.com/l179XjE.png" />,
};

export const TESTIMONIALS: Testimonial[] = [
  {
    user: {
      avatar: "/testimonials/stef91.avif",
      name: {
        first: "Stefan",
        last: "Meier",
      },
      at: "@stef91",
      link: "https://www.producthunt.com/@stef91",
    },
    text: "Crazy how good this works.",
    rating: 5,
    link: "https://www.producthunt.com/products/user-persona?comment=2125676#user-persona",
    platform: PRODUCT_HUNT,
    date: "Dec 30, 2022",
  },
  {
    user: {
      avatar: "/testimonials/jianne_paulo1.avif",
      name: {
        first: "Jianne",
        last: "Paulo",
      },
      description: "UI/UX Designer",
      at: "@jianne_paulo1",
      link: "https://www.producthunt.com/@jianne_paulo1",
    },
    text: "Ohh, loving this! Pretty helpful on our design process",
    rating: 5,
    link: "https://www.producthunt.com/products/user-persona?comment=2126477#user-persona",
    platform: PRODUCT_HUNT,
    date: "Jan 1, 2023",
  },
  {
    user: {
      avatar: "/testimonials/ankit_flamme.avif",
      name: {
        first: "Ankit",
      },
      description: "Founder & CEO at Flamme",
      at: "@ankit_flamme",
      link: "https://www.producthunt.com/@ankit_flamme",
    },
    text: "Wow! Nice! 🔥",
    rating: 5,
    link: "https://www.producthunt.com/products/user-persona?comment=2125579#user-persona",
    platform: PRODUCT_HUNT,
    date: "Dec 30, 2022",
  },
  {
    user: {
      avatar: "/testimonials/manas_sharma.avif",
      name: {
        first: "Manas",
        last: "Sharma",
      },
      description: "Founder Roundup.co",
      at: "@manas_sharma",
      link: "https://www.producthunt.com/@manas_sharma",
    },
    text: "@jacob_bildy It looks fab. Congrats on the launch 🥳",
    rating: 5,
    link: "https://www.producthunt.com/products/user-persona?comment=2132733#user-persona",
    platform: PRODUCT_HUNT,
    date: "Jan 5, 2023",
  },
  {
    user: {
      avatar: "/testimonials/market_mornings.avif",
      name: {
        first: "Michael",
        last: "Kurek",
      },
      description: "Founder at Market Mornings",
      at: "@market_mornings",
      link: "https://www.producthunt.com/@market_mornings",
    },
    text: "Good stuff guys! Love to see ideas like this developed!",
    rating: 5,
    link: "https://www.producthunt.com/products/user-persona?comment=2125529#user-persona",
    platform: PRODUCT_HUNT,
    date: "Dec 30, 2022",
  },
  {
    user: {
      avatar: "/testimonials/samalyx.avif",
      name: {
        first: "Samar",
        last: "Ali",
      },
      description: "Maker At LinkMngr.com",
      at: "@samalyx",
      link: "https://www.producthunt.com/@samalyx",
    },
    text: "This product is going to be a big help for businesses and organizations in creating detailed user personas.",
    rating: 5,
    isTruncated: true,
    link: "https://www.producthunt.com/products/user-persona?comment=2125658#user-persona",
    platform: PRODUCT_HUNT,
    date: "Dec 30, 2022",
  },
  {
    user: {
      avatar: "/testimonials/samhickmann.avif",
      name: {
        first: "Sam",
        last: "Hickmann",
      },
      at: "@samhickmann",
      link: "https://www.producthunt.com/@samhickmann",
    },
    text: "Super useful. I'll use it immediately for my new project. Thanks.",
    rating: 5,
    link: "https://www.producthunt.com/products/user-persona?comment=2125550#user-persona",
    platform: PRODUCT_HUNT,
    date: "Dec 30, 2022",
  },
  {
    user: {
      avatar:
        "https://styles.redditmedia.com/t5_b791d/styles/profileIcon_snoo-nftv2_bmZ0X2VpcDE1NToxMzdfNmFjYjhmYjgyODgwZDM5YzJiODQ0NmY4Nzc4YTE0ZDM0ZWU2Y2ZiN180NTI1MzA_rare_7afde64e-3364-4649-a1f6-46225a534c09-headshot.png?width=64&height=64&frame=1&auto=webp&crop=64:64,smart&s=bc6a5740f2b3eef43ae97ca206b8a9560abc3a23",
      name: {
        first: "sheeeeepy",
        last: "",
      },
      at: "@sheeeeepy",
      link: "https://www.reddit.com/user/sheeeeepy/",
    },
    text: "This is helpful! Thanks!",
    rating: 0,
    link: "https://www.reddit.com/r/InstagramMarketing/comments/1d3qtdv/finding_hashtags_and_seeing_volume_for_free_with/",
    platform: REDDIT,
    date: "May, 2024",
  },
];
