import { useEffect, useRef, useState } from "react";
import {
  MapPin,
  Mail,
  MessageCircle,
  Instagram,
  Phone,
  ChevronDown,
  ArrowRight,
  Globe,
} from "lucide-react";
import { ImageWithFallback } from "@/app/components/figma/ImageWithFallback";
import logoImg from "@/imports/npeople-logo-clean.png";
import heroImage from "@/imports/site-images/hero.jpg";
import aboutImage from "@/imports/site-images/about.jpg";
import visionImage from "@/imports/site-images/vision.jpg";
import skincareImage from "@/imports/site-images/category-skincare.jpg";
import hairBodyImage from "@/imports/site-images/category-hair-body.jpg";
import supplementsImage from "@/imports/site-images/category-supplements.jpg";
import innerBeautyImage from "@/imports/site-images/category-inner-beauty.jpg";
import globalExportImage from "@/imports/site-images/global-export.jpg";
import contactImage from "@/imports/site-images/contact.jpg";

function useInView(threshold = 0.25) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setInView(true); },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return { ref, inView };
}

function FadeUp({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const { ref, inView } = useInView();
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0)" : "translateY(36px)",
        transition: `opacity 0.85s cubic-bezier(0.22,1,0.36,1) ${delay}s, transform 0.85s cubic-bezier(0.22,1,0.36,1) ${delay}s`,
      }}
    >
      {children}
    </div>
  );
}

function SlideIn({
  children,
  delay = 0,
  fromLeft = false,
  className = "",
  style: extraStyle,
}: {
  children: React.ReactNode;
  delay?: number;
  fromLeft?: boolean;
  className?: string;
  style?: React.CSSProperties;
}) {
  const { ref, inView } = useInView();
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: inView ? 1 : 0,
        transform: inView
          ? "translateX(0)"
          : `translateX(${fromLeft ? "-60px" : "60px"})`,
        transition: `opacity 0.9s cubic-bezier(0.22,1,0.36,1) ${delay}s, transform 0.9s cubic-bezier(0.22,1,0.36,1) ${delay}s`,
        ...extraStyle,
      }}
    >
      {children}
    </div>
  );
}

const NAV_ITEMS = [
  "Home",
  "About",
  "History",
  "Vision",
  "Why Us",
  "Values",
  "Brands",
  "Products",
  "Global",
  "Contact",
];

type Language = "ko" | "en" | "cn";

const LANGUAGES: { code: Language; label: string }[] = [
  { code: "ko", label: "KO" },
  { code: "en", label: "EN" },
  { code: "cn", label: "CN" },
];

const LANGUAGE_LABELS: Record<Language, string[]> = {
  ko: ["Home", "회사소개", "연혁", "비전", "강점", "가치", "브랜드", "품목", "글로벌", "문의"],
  en: NAV_ITEMS,
  cn: ["Home", "简介", "历程", "愿景", "优势", "价值", "品牌", "产品", "全球", "联系"],
};

const SEO = {
  ko: {
    title: "엔피플 | K-뷰티 수출 및 한국 화장품 유통 파트너",
    description:
      "엔피플은 검증된 K-뷰티 브랜드, 스킨케어, 헤어&바디, 이너뷰티, 건강기능식품을 전 세계에 공급하는 한국 화장품 수출 및 글로벌 유통 파트너입니다.",
    keywords:
      "K뷰티 수출, 한국 화장품 수출, K-Beauty 유통, 한국 화장품 도매, 스킨케어 수출, 화장품 총판, 한국 뷰티 브랜드, 글로벌 뷰티 유통",
    ogLocale: "ko_KR",
  },
  en: {
    title: "NPEOPLE | Global K-Beauty Export & Korean Cosmetics Distributor",
    description:
      "NPEOPLE is a global K-Beauty export partner and Korean cosmetics distributor supplying verified skincare, hair care, inner beauty, health supplements, and K-Food brands worldwide.",
    keywords:
      "K-Beauty export, Korean cosmetics distributor, Korean skincare supplier, K-beauty wholesale, Korean beauty brands, cosmetics export Korea, skincare export, beauty distribution partner",
    ogLocale: "en_US",
  },
  cn: {
    title: "NPEOPLE | 韩国美妆出口与 K-Beauty 全球分销伙伴",
    description:
      "NPEOPLE 是韩国 K-Beauty 出口及化妆品分销合作伙伴，向全球供应经过验证的护肤、护发、内服美容、保健食品及韩国品牌。",
    keywords:
      "韩国美妆出口, K-Beauty 出口, 韩国化妆品分销, 韩国护肤品供应商, 韩国美妆批发, 韩国化妆品出口, 护肤品出口",
    ogLocale: "zh_CN",
  },
} as const;

const isLanguage = (value: string | undefined): value is Language =>
  value === "ko" || value === "en" || value === "cn";

const getPathLanguage = () => {
  if (typeof window === "undefined") return undefined;
  return window.location.pathname.split("/").filter(Boolean)[0];
};

const getInitialLanguage = (): Language => {
  if (typeof window === "undefined") return "en";
  const pathLanguage = getPathLanguage();
  if (isLanguage(pathLanguage)) return pathLanguage;

  const savedLanguage = window.localStorage.getItem("npeople-language");
  if (isLanguage(savedLanguage ?? undefined)) return savedLanguage as Language;

  return navigator.language.toLowerCase().startsWith("ko") ? "ko" : "en";
};

const setHeadAttribute = (selector: string, attribute: "content" | "href", value: string) => {
  const element = document.head.querySelector<HTMLMetaElement | HTMLLinkElement>(selector);
  if (element) element.setAttribute(attribute, value);
};

const TEXT = {
  ko: {
    heroEyebrow: "GLOBAL K-BEAUTY DISTRIBUTION PARTNER",
    heroTitle: "NPEOPLE",
    heroLead: "글로벌 K-Beauty 시장을 선도하는 프리미엄 파트너",
    heroSub: "2016년부터 한국의 아름다움을 세계로 연결합니다",
    discover: "더 알아보기",
    contact: "문의하기",
    aboutLabel: "01 / 회사 소개",
    aboutLead:
      "다년간의 경험과 전문성을 바탕으로, 엔피플은 우수한 K-제품을 통해 한국의 아름다움과 가치를 세계에 전하며 K-제품 수출의 선두에 서고자 합니다.",
    aboutMeanings: [
      { word: "New", desc: "혁신을 향한 우리의 정신" },
      { word: "Next", desc: "미래를 향한 우리의 비전" },
      { word: "Nexus", desc: "사람과 시장을 연결하는 중심축" },
      { word: "Nature", desc: "한국의 순수하고 진정성 있는 가치" },
    ],
    founded: "설립",
    foundedDetail: "다온컴퍼니 → 엔피플 2025",
    growthLabel: "02 / 성장 스토리",
    journey: "성장 스토리",
    journeyItems: [
      { year: "2016", title: "다온컴퍼니 설립", desc: "해외구매대행 및 자사몰 운영" },
      { year: "2018", title: "국내 유통 확장", desc: "수입잡화 및 화장품 국내유통, 국내브랜드 화장품 총판" },
      { year: "2020–21", title: "동남아시아 수출", desc: "메디필 베트남 총판, 코코앤코코 일본 수출" },
      { year: "2022–23", title: "일본 및 브랜드 제휴", desc: "일본면세점 입점, Qoo10 재팬 브랜드관 입점, 다양한 브랜드사 업무제휴" },
      { year: "2024–25", title: "글로벌 법인 확장", desc: "엔피플 주식회사 법인 설립, 아시아 및 CIS·서아프리카 수출시장 확대" },
    ],
    visionLabel: "03 / 비전",
    visionTitle: "비전",
    missionTitle: "미션",
    vision:
      "전 세계에 진정한 K-뷰티 경험을 전달하는 신뢰받는 글로벌 파트너가 되겠습니다. 우리는 삶을 위한 새로운 가치를 창조하고 고객을 위한 더 나은 미래를 꿈꿉니다.",
    visionLine: "글로벌 K-Beauty 시장을 선도하는 당신의 프리미엄 파트너",
    missions: [
      "투명하고 신뢰할 수 있는 무역 생태계를 구축합니다",
      "검증된 품질의 진정한 한국 브랜드를 전합니다",
      "혁신과 신뢰로 사람과 아름다움을 연결합니다",
    ],
    whyLabel: "04 / 왜 엔피플인가?",
    whyTitle: "왜 엔피플인가?",
    whyLead: "글로벌 K-Beauty 파트너로서 엔피플을 선택해야 하는 네 가지 이유",
    whyItems: [
      { num: "01", title: "합리적인 가격", desc: "경쟁력 있고 공정한 공급" },
      { num: "02", title: "다양한 브랜드", desc: "폭넓은 제품군과 카테고리" },
      { num: "03", title: "체계적인 물류", desc: "안정적이고 효율적인 물류 시스템" },
      { num: "04", title: "신속한 배송", desc: "전 세계적으로 빠르고 정확한 공급" },
    ],
    valuesLabel: "05 / 핵심 가치",
    valuesTitle: "핵심 가치",
    valueItems: [
      { en: "Integrity", ko: "진실성", desc: "투명한 파트너십과 신뢰 기반의 수출 운영" },
      { en: "Quality", ko: "품질", desc: "검증된 고품질 제품만 공급" },
      { en: "Flexibility", ko: "유연성", desc: "바이어 맞춤형 공급 솔루션" },
      { en: "Innovation", ko: "혁신", desc: "디지털 및 글로벌 K-Beauty 트렌드 선도" },
    ],
    brandLabel: "06 / 브랜드 네트워크",
    brandTitle: "검증된 K-Beauty 브랜드",
    brandLead: "엔피플은 검증된 K-Beauty, 웰니스, 라이프스타일 브랜드를 글로벌 시장에 맞춰 큐레이션합니다.",
    stats: [
      { value: "40+", label: "파트너 브랜드" },
      { value: "10+", label: "수출 시장" },
      { value: "2016", label: "사업 시작" },
    ],
    portfolio: "브랜드 포트폴리오",
    portfolioCategories: "스킨케어 · 헤어 & 바디 · 이너뷰티 · 건강기능식품",
    productLabel: "07 / 주요 품목",
    productTitle: "주요 품목",
    productLead: "브랜드 마케팅 지원, ODM/OEM 컨설팅, 글로벌 맞춤형 프로젝트를 함께 제공합니다",
    productCategories: [
      { code: "S", title: "스킨케어", sub: "Skincare", items: ["클렌저", "토너", "세럼", "크림", "마스크팩"] },
      { code: "H&B", title: "헤어 & 바디 케어", sub: "Hair & Body", items: ["프리미엄 헤어 케어", "바디 트리트먼트", "에센셜 케어"] },
      { code: "HS", title: "건강기능식품", sub: "Health Supplements", items: ["콜라겐", "비타민", "프로바이오틱스"] },
      { code: "I&K", title: "이너뷰티 & K-푸드", sub: "Inner Beauty & K-Food", items: ["콜라겐 젤리스틱", "콤부차", "기능성 식품"] },
    ],
    globalLabel: "08 / 글로벌 네트워크",
    globalTitle: "글로벌 네트워크",
    globalLead:
      "엔피플은 아시아, CIS, 아프리카 등 전 세계 수입사 및 유통사와 협력하며 진정성 있는 K-Beauty를 더 넓은 시장으로 확장하고 있습니다.",
    globalRegions: [
      { region: "동아시아", countries: "중국 · 일본 · 베트남", icon: "🌏" },
      { region: "남아시아", countries: "인도 · 방글라데시", icon: "🌿" },
      { region: "러시아 / CIS", countries: "러시아 및 CIS 국가", icon: "❄️" },
      { region: "아프리카 & 유럽", countries: "이집트 · 나이지리아 · 헝가리", icon: "🌍" },
    ],
    countriesLabel: "협력 국가 및 지역",
    countryTags: ["러시아", "중국", "일본", "베트남", "인도", "이집트", "나이지리아", "헝가리"],
    contactLabel: "09 / 문의",
    contactTitle: "문의처",
    contactItems: {
      address: "주소",
      email: "이메일",
      whatsapp: "왓츠앱",
      messenger: "카카오톡 / 위챗",
      instagram: "인스타그램",
    },
    contactForm: {
      title: "문의하기",
      intro: "문의 내용을 남겨주시면 메일로 빠르게 확인하겠습니다.",
      name: "이름",
      company: "회사명",
      email: "이메일",
      message: "문의 내용",
      send: "메일 보내기",
      close: "닫기",
      subject: "[NPEOPLE] 홈페이지 문의",
      sending: "전송 중입니다...",
      success: "문의가 전송되었습니다. 빠르게 확인하겠습니다.",
      error: "전송에 실패했습니다. 잠시 후 다시 시도해주세요.",
      missingEndpoint: "Formspree 주소가 아직 설정되지 않았습니다.",
    },
    closing: "단순한 유통을 넘어, 진정한 파트너십을 통해 새로운 가치를 창조합니다",
  },
  en: {
    heroEyebrow: "GLOBAL K-BEAUTY DISTRIBUTION PARTNER",
    heroTitle: "NPEOPLE",
    heroLead: "Your Premium Partner Leading the Global K-Beauty Market",
    heroSub: "Connecting Korean Beauty to the World Since 2016",
    discover: "Discover More",
    contact: "Contact Us",
    aboutLabel: "01 / About Npeople",
    aboutLead:
      "With years of expertise, Npeople stands at the forefront of K-product exports — sharing Korea's authentic beauty and values with the world through verified brands and trusted partnerships.",
    aboutMeanings: [
      { word: "New", desc: "Our spirit toward innovation" },
      { word: "Next", desc: "Our vision toward the future" },
      { word: "Nexus", desc: "The central axis connecting people and markets" },
      { word: "Nature", desc: "Korea's pure and authentic values" },
    ],
    founded: "FOUNDED",
    foundedDetail: "Daoncompany → Npeople 2025",
    growthLabel: "02 / Growth Story",
    journey: "Our Journey",
    journeyItems: [
      { year: "2016", title: "Founded", desc: "Daoncompany established; overseas purchase agency and owned store operation" },
      { year: "2018", title: "Distribution Expansion", desc: "Domestic distribution of imported sundries and cosmetics; exclusive distributor for domestic brand cosmetics" },
      { year: "2020–21", title: "Southeast Asia & Japan", desc: "Medi-peel Vietnam distributor; Coco&Coco Japan export" },
      { year: "2022–23", title: "Japan & Partners", desc: "Japanese duty-free stores, Qoo10 Japan brand store, business partnerships with various Korean brands" },
      { year: "2024–25", title: "Npeople Co., Ltd", desc: "Multi-brand export partnerships in Asia and CIS; expansion into West Africa including Egypt, Nigeria and Côte d'Ivoire" },
    ],
    visionLabel: "03 / Vision",
    visionTitle: "Vision",
    missionTitle: "Mission",
    vision:
      "To be the trusted global partner delivering authentic K-Beauty experiences worldwide. We create new value for life and dream of a better future for our customers.",
    visionLine: "Your Premium Partner Leading the Global K-Beauty Market",
    missions: [
      "Build a transparent and trustworthy global trade ecosystem",
      "Deliver authentic Korean brands with verified quality to buyers worldwide",
      "Connect people and beauty through innovation, trust, and genuine partnership",
    ],
    whyLabel: "04 / Why Choose Us",
    whyTitle: "Why Npeople?",
    whyLead: "Four pillars that set us apart as your global K-beauty partner",
    whyItems: [
      { num: "01", title: "Reasonable Pricing", desc: "Competitive and fair supply rates" },
      { num: "02", title: "Diverse Brands", desc: "Extensive product range and categories" },
      { num: "03", title: "Systematic Logistics", desc: "Stable and efficient logistics system" },
      { num: "04", title: "Swift Delivery", desc: "Fast and accurate supply worldwide" },
    ],
    valuesLabel: "05 / Core Values",
    valuesTitle: "Our Values",
    valueItems: [
      { en: "Integrity", ko: "Integrity", desc: "Transparent partnership and reliable export operations" },
      { en: "Quality", ko: "Quality", desc: "Only verified and certified products" },
      { en: "Flexibility", ko: "Flexibility", desc: "Tailored supply solutions for each buyer" },
      { en: "Innovation", ko: "Innovation", desc: "Pioneering digital and global K-Beauty trends" },
    ],
    brandLabel: "06 / Brand Network",
    brandTitle: "Verified K-Beauty Brands",
    brandLead: "Npeople curates verified Korean beauty, wellness and lifestyle brands for market-specific global distribution.",
    stats: [
      { value: "40+", label: "Partner Brands" },
      { value: "10+", label: "Active Markets" },
      { value: "2016", label: "Export Heritage" },
    ],
    portfolio: "Curated Portfolio",
    portfolioCategories: "Skincare · Hair & Body · Inner Beauty · Health Supplements",
    productLabel: "07 / Product Portfolio",
    productTitle: "Key Categories",
    productLead: "Also offering Brand Marketing Support, ODM/OEM Consulting & Global Customized Projects",
    productCategories: [
      { code: "S", title: "Skincare", sub: "Skincare", items: ["Cleanser", "Toner", "Serum", "Cream", "Mask Pack"] },
      { code: "H&B", title: "Hair & Body", sub: "Hair & Body", items: ["Premium Hair Care", "Body Treatment", "Essential Care"] },
      { code: "HS", title: "Health Supplements", sub: "Health Supplements", items: ["Collagen", "Vitamin", "Probiotics"] },
      { code: "I&K", title: "Inner Beauty & K-Food", sub: "Inner Beauty & K-Food", items: ["Collagen Jelly Stick", "Kombucha", "Functional Foods"] },
    ],
    globalLabel: "08 / Global Network",
    globalTitle: "Our Reach",
    globalLead:
      "Npeople continuously expands export markets across Asia, CIS, Europe, and Africa — partnering with importers and distributors worldwide to spread authentic K-Beauty.",
    globalRegions: [
      { region: "East Asia", countries: "China · Japan · Vietnam", icon: "🌏" },
      { region: "South Asia", countries: "India · Bangladesh", icon: "🌿" },
      { region: "Russia / CIS", countries: "Russia & CIS Nations", icon: "❄️" },
      { region: "Africa & Europe", countries: "Egypt · Nigeria · Hungary", icon: "🌍" },
    ],
    countriesLabel: "Countries & Regions Served",
    countryTags: ["Russia", "China", "Japan", "Vietnam", "India", "Egypt", "Nigeria", "Hungary"],
    contactLabel: "09 / Contact",
    contactTitle: "Get In Touch",
    contactItems: {
      address: "ADDRESS",
      email: "EMAIL",
      whatsapp: "WHATSAPP",
      messenger: "KAKAO / WECHAT",
      instagram: "INSTAGRAM",
    },
    contactForm: {
      title: "Contact Us",
      intro: "Leave your inquiry and we will review it by email.",
      name: "Name",
      company: "Company",
      email: "Email",
      message: "Message",
      send: "Send Email",
      close: "Close",
      subject: "[NPEOPLE] Website Inquiry",
      sending: "Sending...",
      success: "Your inquiry has been sent. We will review it shortly.",
      error: "Failed to send. Please try again in a moment.",
      missingEndpoint: "Formspree endpoint is not configured yet.",
    },
    closing: "Beyond distribution — creating new value through true partnership",
  },
  cn: {
    heroEyebrow: "GLOBAL K-BEAUTY DISTRIBUTION PARTNER",
    heroTitle: "NPEOPLE",
    heroLead: "引领全球 K-Beauty 市场的高端合作伙伴",
    heroSub: "自2016年起，将韩国之美连接至世界",
    discover: "了解更多",
    contact: "联系我们",
    aboutLabel: "01 / 公司简介",
    aboutLead:
      "凭借多年来积累的经验与专业能力，Npeople 致力于通过优质韩国商品，将韩国之美与核心价值传递到世界各地。",
    aboutMeanings: [
      { word: "New", desc: "代表不断创新的精神" },
      { word: "Next", desc: "代表面向未来的愿景" },
      { word: "Nexus", desc: "代表连接人与市场的核心枢纽" },
      { word: "Nature", desc: "代表韩国纯粹而真实的价值" },
    ],
    founded: "成立",
    foundedDetail: "Daoncompany → Npeople 2025",
    growthLabel: "02 / 发展历程",
    journey: "发展历程",
    journeyItems: [
      { year: "2016", title: "Daoncompany 成立", desc: "海外代购及自营店运营" },
      { year: "2018", title: "国内分销", desc: "进口日用品及化妆品国内分销，韩国本土品牌化妆品独家经销商" },
      { year: "2020–21", title: "东南亚与日本", desc: "Medi-peel 越南经销商，Coco&Coco 出口至日本" },
      { year: "2022–23", title: "日本与品牌合作", desc: "入驻日本免税店、Qoo10 日本品牌馆，并与多家韩国品牌及分销商建立合作关系" },
      { year: "2024–25", title: "Npeople 股份有限公司", desc: "与亚洲及独联体地区多个品牌建立出口合作，拓展埃及、尼日利亚、科特迪瓦等非洲市场" },
    ],
    visionLabel: "03 / 愿景",
    visionTitle: "愿景",
    missionTitle: "使命",
    vision:
      "成为值得信赖的全球合作伙伴，将真正的 K-Beauty 体验带给世界各地。我们为生活创造全新价值，并与客户共同憧憬更加美好的未来。",
    visionLine: "引领全球 K-Beauty 市场的高端合作伙伴",
    missions: [
      "构建透明、可靠的贸易生态体系",
      "提供品质经过验证的正宗韩国品牌",
      "以创新与信任连接人与美",
    ],
    whyLabel: "04 / 选择 Npeople 的理由",
    whyTitle: "选择 Npeople 的理由",
    whyLead: "作为全球 K-Beauty 合作伙伴，Npeople 具备四大核心优势",
    whyItems: [
      { num: "01", title: "合理价格", desc: "具有竞争力且公平的供货价格" },
      { num: "02", title: "多元品牌", desc: "丰富的产品系列与品类" },
      { num: "03", title: "系统化物流", desc: "稳定高效的物流体系" },
      { num: "04", title: "快速交付", desc: "快速、准确地向全球供货" },
    ],
    valuesLabel: "05 / 核心价值",
    valuesTitle: "核心价值",
    valueItems: [
      { en: "Integrity", ko: "诚信", desc: "透明的合作关系与可靠的出口运营" },
      { en: "Quality", ko: "品质", desc: "仅提供经过验证与认证的产品" },
      { en: "Flexibility", ko: "灵活性", desc: "为每位买家提供定制化供应解决方案" },
      { en: "Innovation", ko: "开拓", desc: "引领数字化及全球 K-Beauty 潮流" },
    ],
    brandLabel: "06 / 品牌网络",
    brandTitle: "经过验证的 K-Beauty 品牌",
    brandLead: "Npeople 为不同市场精选经过验证的韩国美妆、健康及生活方式品牌。",
    stats: [
      { value: "40+", label: "合作品牌" },
      { value: "10+", label: "出口市场" },
      { value: "2016", label: "业务起点" },
    ],
    portfolio: "品牌组合",
    portfolioCategories: "护肤 · 护发与身体护理 · 内服美容 · 保健食品",
    productLabel: "07 / 产品组合",
    productTitle: "产品组合",
    productLead: "同时提供品牌营销支持、ODM/OEM 咨询及全球定制化项目",
    productCategories: [
      { code: "S", title: "护肤品", sub: "Skincare", items: ["洁面产品", "爽肤水", "精华液", "面霜", "面膜"] },
      { code: "H&B", title: "护发与身体护理", sub: "Hair & Body", items: ["高端护发产品", "身体护理", "基础护理"] },
      { code: "HS", title: "保健食品", sub: "Health Supplements", items: ["胶原蛋白", "维生素", "益生菌"] },
      { code: "I&K", title: "内服美容与韩国食品", sub: "Inner Beauty & K-Food", items: ["胶原蛋白果冻条", "康普茶", "功能性食品"] },
    ],
    globalLabel: "08 / 全球网络",
    globalTitle: "全球网络",
    globalLead:
      "Npeople 持续拓展亚洲、独联体、欧洲及非洲等出口市场，与全球进口商及经销商开展合作。",
    globalRegions: [
      { region: "东亚", countries: "中国 · 日本 · 越南", icon: "🌏" },
      { region: "南亚", countries: "印度 · 孟加拉国", icon: "🌿" },
      { region: "俄罗斯 / 独联体", countries: "俄罗斯及独联体国家", icon: "❄️" },
      { region: "非洲与欧洲", countries: "埃及 · 尼日利亚 · 匈牙利", icon: "🌍" },
    ],
    countriesLabel: "合作国家与地区",
    countryTags: ["俄罗斯", "中国", "日本", "越南", "印度", "埃及", "尼日利亚", "匈牙利"],
    contactLabel: "09 / 联系",
    contactTitle: "联系方式",
    contactItems: {
      address: "地址",
      email: "邮箱",
      whatsapp: "WhatsApp",
      messenger: "KakaoTalk / 微信",
      instagram: "Instagram",
    },
    contactForm: {
      title: "联系我们",
      intro: "请留下咨询内容，我们将通过邮件尽快确认。",
      name: "姓名",
      company: "公司名称",
      email: "邮箱",
      message: "咨询内容",
      send: "发送邮件",
      close: "关闭",
      subject: "[NPEOPLE] 官网咨询",
      sending: "发送中...",
      success: "您的咨询已发送，我们将尽快确认。",
      error: "发送失败，请稍后重试。",
      missingEndpoint: "尚未设置 Formspree 地址。",
    },
    closing: "Npeople 不止于简单分销，而是通过真诚合作创造全新价值",
  },
} as const;

type BrandPartner = {
  name: string;
  logo?: string;
  logoClass?: string;
};

const BRAND_LOGOS = {
  medicube: new URL("../imports/brand-logos/processed/medicube.png", import.meta.url).href,
  skin1004: new URL("../imports/brand-logos/slin1004.svg", import.meta.url).href,
  beautyOfJoseon: new URL("../imports/brand-logos/processed/beauty-of-joseon.png", import.meta.url).href,
  drJart: new URL("../imports/brand-logos/processed/dr-jart.png", import.meta.url).href,
  anua: new URL("../imports/brand-logos/anua.svg", import.meta.url).href,
  torriden: new URL("../imports/brand-logos/processed/torriden.png", import.meta.url).href,
  sNature: new URL("../imports/brand-logos/processed/s-nature.png", import.meta.url).href,
  oliveyoung: new URL("../imports/brand-logos/processed/oliveyoung.png", import.meta.url).href,
  abib: new URL("../imports/brand-logos/abib.svg", import.meta.url).href,
  tocobo: new URL("../imports/brand-logos/tocobo.svg", import.meta.url).href,
  numbuzin: new URL("../imports/brand-logos/numbuzin.svg", import.meta.url).href,
  fwee: new URL("../imports/brand-logos/processed/fwee.png", import.meta.url).href,
  ahc: new URL("../imports/brand-logos/AHC.svg", import.meta.url).href,
  atopalm: new URL("../imports/brand-logos/processed/atopalm.png", import.meta.url).href,
  neogen: new URL("../imports/brand-logos/processed/neogen.png", import.meta.url).href,
  biodance: new URL("../imports/brand-logos/processed/biodance.png", import.meta.url).href,
  rejuran: new URL("../imports/brand-logos/processed/rejuran-black.png", import.meta.url).href,
  vt: new URL("../imports/brand-logos/processed/vt.png", import.meta.url).href,
  cellfusionC: new URL("../imports/brand-logos/cellpusionC.svg", import.meta.url).href,
  theOrdinary: new URL("../imports/brand-logos/theOrdinary.svg", import.meta.url).href,
  aromatica: new URL("../imports/brand-logos/processed/aromatica.png", import.meta.url).href,
  drAlthea: new URL("../imports/brand-logos/processed/dr-althea.png", import.meta.url).href,
  rejuAll: new URL("../imports/brand-logos/processed/reju-all.png", import.meta.url).href,
  ksecret: new URL("../imports/brand-logos/processed/ksecret.png", import.meta.url).href,
  lagom: new URL("../imports/brand-logos/processed/lagom.png", import.meta.url).href,
  medipeel: new URL("../imports/brand-logos/processed/medipeel.png", import.meta.url).href,
  vella: new URL("../imports/brand-logos/processed/vella.png", import.meta.url).href,
  elt: new URL("../imports/brand-logos/elt.svg", import.meta.url).href,
  koy: new URL("../imports/brand-logos/processed/koy.png", import.meta.url).href,
  maryMay: new URL("../imports/brand-logos/mary&may.avif", import.meta.url).href,
  axisY: new URL("../imports/brand-logos/processed/axis-y.png", import.meta.url).href,
  ooznary: new URL("../imports/brand-logos/processed/ooznary.png", import.meta.url).href,
  vidivici: new URL("../imports/brand-logos/vidivici-black.svg", import.meta.url).href,
  purito: new URL("../imports/brand-logos/processed/purito.png", import.meta.url).href,
  lactofit: new URL("../imports/brand-logos/processed/lactofit.png", import.meta.url).href,
  vitaminVillage: new URL("../imports/brand-logos/processed/vitamin-village.png", import.meta.url).href,
  cjWellcare: new URL("../imports/brand-logos/CJwellcare.svg", import.meta.url).href,
  hetras: new URL("../imports/brand-logos/processed/hetras.png", import.meta.url).href,
  unove: new URL("../imports/brand-logos/unove-horizontal.svg", import.meta.url).href,
  growus: new URL("../imports/brand-logos/processed/growus-transparent.png", import.meta.url).href,
  moev: new URL("../imports/brand-logos/processed/moev.png", import.meta.url).href,
  lilyeve: new URL("../imports/brand-logos/lilyeve.svg", import.meta.url).href,
} as const;

const BRAND_PARTNERS: BrandPartner[] = [
  { name: "메디큐브", logo: BRAND_LOGOS.medicube },
  { name: "SKIN1004", logo: BRAND_LOGOS.skin1004 },
  { name: "조선미녀", logo: BRAND_LOGOS.beautyOfJoseon, logoClass: "brand-logo-calligraphy" },
  { name: "닥터자르트", logo: BRAND_LOGOS.drJart },
  { name: "아누아", logo: BRAND_LOGOS.anua },
  { name: "토리든", logo: BRAND_LOGOS.torriden },
  { name: "에스네이처", logo: BRAND_LOGOS.sNature },
  { name: "올리브영", logo: BRAND_LOGOS.oliveyoung },
  { name: "아비브", logo: BRAND_LOGOS.abib },
  { name: "토코보", logo: BRAND_LOGOS.tocobo },
  { name: "넘버즈인", logo: BRAND_LOGOS.numbuzin },
  { name: "퓌", logo: BRAND_LOGOS.fwee, logoClass: "brand-logo-wide" },
  { name: "AHC", logo: BRAND_LOGOS.ahc },
  { name: "아토팜", logo: BRAND_LOGOS.atopalm },
  { name: "네오젠", logo: BRAND_LOGOS.neogen, logoClass: "brand-logo-wide" },
  { name: "바이오던스", logo: BRAND_LOGOS.biodance },
  { name: "리쥬란", logo: BRAND_LOGOS.rejuran, logoClass: "brand-logo-wide" },
  { name: "VT", logo: BRAND_LOGOS.vt },
  { name: "셀퓨전씨", logo: BRAND_LOGOS.cellfusionC },
  { name: "디오디너리", logo: BRAND_LOGOS.theOrdinary },
  { name: "아로마티카", logo: BRAND_LOGOS.aromatica, logoClass: "brand-logo-wide" },
  { name: "닥터엘시아", logo: BRAND_LOGOS.drAlthea, logoClass: "brand-logo-wide" },
  { name: "닥터리쥬올", logo: BRAND_LOGOS.rejuAll, logoClass: "brand-logo-wide" },
  { name: "케이시크릿", logo: BRAND_LOGOS.ksecret },
  { name: "라곰", logo: BRAND_LOGOS.lagom },
  { name: "메디필", logo: BRAND_LOGOS.medipeel },
  { name: "VELLA", logo: BRAND_LOGOS.vella },
  { name: "ELT", logo: BRAND_LOGOS.elt },
  { name: "KOY", logo: BRAND_LOGOS.koy },
  { name: "마리앤메이", logo: BRAND_LOGOS.maryMay },
  { name: "AXIS-Y", logo: BRAND_LOGOS.axisY },
  { name: "오우즈너리", logo: BRAND_LOGOS.ooznary },
  { name: "비디비치", logo: BRAND_LOGOS.vidivici },
  { name: "퓨리토", logo: BRAND_LOGOS.purito, logoClass: "brand-logo-wide" },
  { name: "락토핏", logo: BRAND_LOGOS.lactofit },
  { name: "결콜라겐" },
  { name: "비타민마을", logo: BRAND_LOGOS.vitaminVillage, logoClass: "brand-logo-wide" },
  { name: "CJ웰케어", logo: BRAND_LOGOS.cjWellcare },
  { name: "헤트라스", logo: BRAND_LOGOS.hetras, logoClass: "brand-logo-wide" },
  { name: "어노브", logo: BRAND_LOGOS.unove, logoClass: "brand-logo-wide" },
  { name: "그로우어스", logo: BRAND_LOGOS.growus, logoClass: "brand-logo-square" },
  { name: "모에브", logo: BRAND_LOGOS.moev, logoClass: "brand-logo-wide" },
  { name: "릴리이브", logo: BRAND_LOGOS.lilyeve },
];

const BRAND_ROWS = [
  BRAND_PARTNERS.filter((_, i) => i % 2 === 0),
  BRAND_PARTNERS.filter((_, i) => i % 2 === 1),
];

const ROSE = "#e3c7ca";
const DEEP_ROSE = "#b89fa2";
const DARK = "#1a1512";
const CREAM = "#faf8f6";
const CONTACT_EMAIL = "npeople001@gmail.com";
const FORMSPREE_ENDPOINT = import.meta.env.VITE_FORMSPREE_ENDPOINT || "";

export default function App() {
  const containerRef = useRef<HTMLDivElement>(null);
  const snapLockRef = useRef(false);
  const [language, setLanguage] = useState<Language>(() => getInitialLanguage());
  const [active, setActive] = useState(0);
  const [navBg, setNavBg] = useState(false);
  const [contactOpen, setContactOpen] = useState(false);
  const [contactStatus, setContactStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const t = TEXT[language];
  const seo = SEO[language];

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const onScroll = () => {
      const sections = Array.from(el.querySelectorAll<HTMLElement>("[data-section]"));
      const scrollCenter = el.scrollTop + el.clientHeight * 0.42;
      const idx = sections.reduce((closestIndex, section, index) => {
        const currentDistance = Math.abs(section.offsetTop - scrollCenter);
        const closestDistance = Math.abs(sections[closestIndex].offsetTop - scrollCenter);
        return currentDistance < closestDistance ? index : closestIndex;
      }, 0);
      setActive(idx);
      setNavBg(el.scrollTop > 60);
    };
    el.addEventListener("scroll", onScroll, { passive: true });
    return () => el.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const pathLanguage = getPathLanguage();
    if (isLanguage(pathLanguage) && pathLanguage !== language) {
      setLanguage(pathLanguage);
      return;
    }

    if (!isLanguage(pathLanguage)) {
      window.history.replaceState(null, "", `/${language}${window.location.search}${window.location.hash}`);
    }

    window.localStorage.setItem("npeople-language", language);
    document.documentElement.lang = language === "cn" ? "zh-CN" : language === "ko" ? "ko-KR" : "en";
  }, [language]);

  useEffect(() => {
    const origin = window.location.origin;
    const currentUrl = `${origin}/${language}`;

    document.title = seo.title;
    setHeadAttribute('meta[name="description"]', "content", seo.description);
    setHeadAttribute('meta[name="keywords"]', "content", seo.keywords);
    setHeadAttribute('meta[property="og:title"]', "content", seo.title);
    setHeadAttribute('meta[property="og:description"]', "content", seo.description);
    setHeadAttribute('meta[property="og:locale"]', "content", seo.ogLocale);
    setHeadAttribute('meta[property="og:url"]', "content", currentUrl);
    setHeadAttribute('meta[name="twitter:title"]', "content", seo.title);
    setHeadAttribute('meta[name="twitter:description"]', "content", seo.description);
    setHeadAttribute('link[rel="canonical"]', "href", currentUrl);
    setHeadAttribute('link[hreflang="ko"]', "href", `${origin}/ko`);
    setHeadAttribute('link[hreflang="en"]', "href", `${origin}/en`);
    setHeadAttribute('link[hreflang="zh-CN"]', "href", `${origin}/cn`);
    setHeadAttribute('link[hreflang="x-default"]', "href", `${origin}/en`);

    const structuredData = {
      "@context": "https://schema.org",
      "@type": "Organization",
      name: "NPEOPLE Co., Ltd.",
      alternateName: ["NPEOPLE", "Npeople", "엔피플"],
      url: currentUrl,
      email: CONTACT_EMAIL,
      foundingDate: "2025",
      address: {
        "@type": "PostalAddress",
        streetAddress: "SKY-L65 #915, 200 Wangsan-ro, Dongdaemun-gu",
        addressLocality: "Seoul",
        addressCountry: "KR",
      },
      sameAs: ["https://instagram.com/npeople_"],
      description: seo.description,
      knowsAbout: [
        "K-Beauty export",
        "Korean cosmetics distributor",
        "Korean skincare supplier",
        "Korean beauty wholesale",
        "Health supplements",
        "Inner beauty",
      ],
    };

    let script = document.getElementById("npeople-jsonld") as HTMLScriptElement | null;
    if (!script) {
      script = document.createElement("script");
      script.type = "application/ld+json";
      script.id = "npeople-jsonld";
      document.head.appendChild(script);
    }
    script.textContent = JSON.stringify(structuredData);
  }, [language, seo]);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const onWheel = (event: WheelEvent) => {
      if (snapLockRef.current || event.deltaY <= 18) return;
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      const isLeavingHero = el.scrollTop < el.clientHeight * 0.55;
      if (!isLeavingHero) return;

      event.preventDefault();
      snapLockRef.current = true;
      el.scrollTo({ top: el.clientHeight, behavior: "smooth" });
      window.setTimeout(() => {
        snapLockRef.current = false;
      }, 980);
    };

    el.addEventListener("wheel", onWheel, { passive: false });
    return () => el.removeEventListener("wheel", onWheel);
  }, []);

  const scrollTo = (i: number) => {
    const el = containerRef.current;
    if (!el) return;
    const section = el.querySelector<HTMLElement>(`[data-section="${i}"]`);
    el.scrollTo({ top: section?.offsetTop ?? i * el.clientHeight, behavior: "smooth" });
  };

  const changeLanguage = (nextLanguage: Language) => {
    setLanguage(nextLanguage);
    window.history.pushState(null, "", `/${nextLanguage}${window.location.search}${window.location.hash}`);
  };

  const openContactModal = () => {
    setContactStatus("idle");
    setContactOpen(true);
  };

  const handleContactSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formElement = event.currentTarget;
    const form = new FormData(formElement);
    form.set("language", language);
    form.set("subject", t.contactForm.subject);
    form.set("_subject", t.contactForm.subject);
    form.set("to", CONTACT_EMAIL);

    if (!FORMSPREE_ENDPOINT) {
      setContactStatus("error");
      return;
    }

    setContactStatus("sending");
    try {
      const response = await fetch(FORMSPREE_ENDPOINT, {
        method: "POST",
        headers: { Accept: "application/json" },
        body: form,
      });

      setContactStatus(response.status < 500 ? "success" : "error");
      if (response.status < 500) formElement.reset();
    } catch {
      setContactStatus("success");
      formElement.reset();
    }
  };

  return (
    <div className="relative w-full h-screen overflow-hidden" style={{ fontFamily: "'Inter', sans-serif" }}>
      {/* Fixed navbar */}
      <nav
        className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-10 py-5 transition-all duration-500"
        style={{
          background: navBg ? "rgba(250,248,246,0.92)" : "transparent",
          backdropFilter: navBg ? "blur(20px)" : "none",
          borderBottom: navBg ? `1px solid rgba(227,199,202,0.3)` : "none",
        }}
      >
        <button onClick={() => scrollTo(0)} className="flex items-center gap-3">
          <ImageWithFallback
            src={logoImg}
            alt="Npeople logo"
            className="w-9 h-9 object-contain"
          />
          <span
            className="text-lg font-semibold tracking-[0.25em]"
            style={{
              fontFamily: "'Playfair Display', serif",
              color: active === 0 && !navBg ? "#fff" : DARK,
            }}
          >
            NPEOPLE
          </span>
        </button>

        <div className="hidden lg:flex items-center gap-7">
          {NAV_ITEMS.map((item, i) => (
            <button
              key={item}
              onClick={() => scrollTo(i)}
              className="text-xs tracking-[0.15em] uppercase transition-all duration-300 relative"
              style={{
                color:
                  active === i
                    ? ROSE
                    : active === 0 && !navBg
                    ? "rgba(255,255,255,0.75)"
                    : "#5a4a4c",
                fontWeight: active === i ? 600 : 400,
              }}
            >
              {LANGUAGE_LABELS[language][i]}
              {active === i && (
                <span
                  className="absolute -bottom-1 left-0 right-0 h-px"
                  style={{ background: ROSE }}
                />
              )}
            </button>
          ))}
        </div>

        <div
          className="flex items-center gap-1 rounded-full px-1.5 py-1"
          style={{ background: navBg ? "rgba(227,199,202,0.18)" : "rgba(255,255,255,0.12)" }}
        >
          {LANGUAGES.map((item) => (
            <button
              key={item.code}
              onClick={() => changeLanguage(item.code)}
              className="rounded-full px-3 py-1.5 text-[10px] font-semibold tracking-[0.16em] transition-all duration-300"
              style={{
                background: language === item.code ? ROSE : "transparent",
                color: language === item.code
                  ? DARK
                  : active === 0 && !navBg
                  ? "rgba(255,255,255,0.82)"
                  : "#5a4a4c",
              }}
            >
              {item.label}
            </button>
          ))}
        </div>
      </nav>

      {/* Section nav dots */}
      <div className="fixed right-6 top-1/2 -translate-y-1/2 z-50 flex flex-col gap-2.5">
        {NAV_ITEMS.map((_, i) => (
          <button
            key={i}
            onClick={() => scrollTo(i)}
            className="rounded-full transition-all duration-400"
            style={{
              width: "6px",
              height: active === i ? "28px" : "6px",
              background: active === i ? ROSE : "rgba(227,199,202,0.45)",
            }}
          />
        ))}
      </div>

      {/* Scroll container */}
      <div
        ref={containerRef}
        className="w-full h-screen overflow-y-scroll"
        style={{ scrollSnapType: "none" }}
      >
        {/* ── SECTION 1: HERO ───────────────────────────────────────────── */}
        <section
          data-section="0"
          className="relative w-full h-screen flex items-center justify-center overflow-hidden"
          style={{ scrollSnapAlign: "start" }}
        >
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: `url(${heroImage})`,
            }}
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(160deg, rgba(26,21,18,0.78) 0%, rgba(90,74,76,0.55) 50%, rgba(227,199,202,0.25) 100%)",
            }}
          />

          <div className="relative z-10 text-center px-8 max-w-5xl mx-auto">
            <div
              className="inline-block mb-6"
              style={{
                opacity: 1,
                animation: "fadeDown 1s cubic-bezier(0.22,1,0.36,1) 0.2s both",
              }}
            >
              <ImageWithFallback
                src={logoImg}
                alt="Npeople"
                className="w-20 h-20 object-contain mx-auto"
              />
            </div>

            <p
              className="text-xs tracking-[0.55em] mb-5 font-light"
              style={{
                color: ROSE,
                animation: "fadeDown 1s cubic-bezier(0.22,1,0.36,1) 0.4s both",
              }}
            >
              {t.heroEyebrow}
            </p>

            <h1
              className="font-bold mb-6 leading-none"
              style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: "clamp(64px, 12vw, 140px)",
                color: "#ffffff",
                letterSpacing: "-0.02em",
                animation: "fadeUp 1.1s cubic-bezier(0.22,1,0.36,1) 0.5s both",
              }}
            >
              {t.heroTitle}
            </h1>

            <div
              className="w-16 h-px mx-auto mb-7"
              style={{
                background: ROSE,
                animation: "scaleX 0.8s ease 0.9s both",
                transformOrigin: "center",
              }}
            />

            <p
              className="text-lg md:text-2xl font-light max-w-2xl mx-auto leading-relaxed"
              style={{
                color: "rgba(255,255,255,0.82)",
                animation: "fadeUp 1s cubic-bezier(0.22,1,0.36,1) 1s both",
              }}
            >
              {t.heroLead}
            </p>

            <p
              className="mt-3 text-sm font-light tracking-widest"
              style={{
                color: "rgba(255,255,255,0.45)",
                animation: "fadeUp 1s ease 1.2s both",
              }}
            >
              {t.heroSub}
            </p>

            <div
              className="mt-10 flex items-center justify-center gap-4"
              style={{ animation: "fadeUp 1s ease 1.4s both" }}
            >
              <button
                onClick={() => scrollTo(1)}
                className="px-8 py-3.5 rounded-full text-sm font-semibold tracking-wider transition-all duration-300 hover:scale-105"
                style={{ background: ROSE, color: DARK }}
              >
                {t.discover}
              </button>
              <button
                onClick={openContactModal}
                className="px-8 py-3.5 rounded-full text-sm font-semibold tracking-wider border transition-all duration-300 hover:bg-white hover:text-gray-900"
                style={{ borderColor: "rgba(255,255,255,0.4)", color: "#fff" }}
              >
                {t.contact}
              </button>
            </div>
          </div>

          <button
            onClick={() => scrollTo(1)}
            className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
            style={{ color: ROSE, animation: "fadeUp 1s ease 1.6s both" }}
          >
            <span className="text-[10px] tracking-[0.4em]">SCROLL</span>
            <ChevronDown className="w-4 h-4 animate-bounce" />
          </button>
        </section>

        {/* ── SECTION 2: ABOUT ──────────────────────────────────────────── */}
        <section
          data-section="1"
          className="w-full h-screen flex items-center overflow-hidden"
          style={{ scrollSnapAlign: "start", background: CREAM }}
        >
          <div className="w-full max-w-7xl mx-auto px-10 grid grid-cols-1 md:grid-cols-2 gap-14 items-center">
            <SlideIn fromLeft delay={0}>
              <p className="text-xs tracking-[0.4em] mb-5 uppercase" style={{ color: DEEP_ROSE }}>
                {t.aboutLabel}
              </p>
              <h2
                className="font-bold mb-6 leading-none"
                style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(48px, 7vw, 88px)", color: DARK }}
              >
                N<span style={{ color: ROSE }}>people</span>
              </h2>
              <div className="w-10 h-px mb-8" style={{ background: DEEP_ROSE }} />

              <div className="space-y-2 mb-8">
                {t.aboutMeanings.map((item, i) => (
                  <FadeUp key={item.word} delay={0.1 + i * 0.1}>
                    <div
                      className="flex items-center gap-5 py-3.5 border-b"
                      style={{ borderColor: "rgba(227,199,202,0.35)" }}
                    >
                      <span
                        className="text-2xl font-bold w-10 flex-shrink-0"
                        style={{ fontFamily: "'Playfair Display', serif", color: ROSE }}
                      >
                        N
                      </span>
                      <div className="flex items-baseline gap-3">
                        <span className="font-semibold tracking-wide text-sm" style={{ color: DARK }}>
                          {item.word}
                        </span>
                        <span className="text-sm" style={{ color: "#8a7a7c" }}>
                          — {item.desc}
                        </span>
                      </div>
                    </div>
                  </FadeUp>
                ))}
              </div>

              <FadeUp delay={0.6}>
                <p className="text-sm leading-relaxed" style={{ color: "#5a4a4c" }}>
                  {t.aboutLead}
                </p>
              </FadeUp>
            </SlideIn>

            <SlideIn delay={0.2}>
              <div className="relative">
                <div
                  className="absolute -top-5 -right-5 w-full h-full rounded-3xl"
                  style={{ background: "rgba(227,199,202,0.18)" }}
                />
                <img
                  src={aboutImage}
                  alt="K-beauty skincare serums"
                  className="relative rounded-3xl w-full object-cover shadow-2xl"
                  style={{ height: "480px" }}
                />
                <div
                  className="absolute -bottom-6 -left-6 rounded-2xl px-6 py-5"
                  style={{ background: DARK, minWidth: "200px" }}
                >
                  <p className="text-xs tracking-wider mb-1" style={{ color: ROSE }}>{t.founded}</p>
                  <p className="text-2xl font-bold" style={{ fontFamily: "'Playfair Display', serif", color: "#fff" }}>2016</p>
                  <p className="text-xs mt-1" style={{ color: "rgba(255,255,255,0.5)" }}>{t.foundedDetail}</p>
                </div>
              </div>
            </SlideIn>
          </div>
        </section>

        {/* ── SECTION 3: GROWTH STORY ───────────────────────────────────── */}
        <section
          data-section="2"
          className="w-full min-h-[760px] py-20 flex items-center overflow-hidden"
          style={{ scrollSnapAlign: "start", background: DARK }}
        >
          <div className="w-full max-w-7xl mx-auto px-10">
            <FadeUp>
              <p className="text-xs tracking-[0.4em] mb-4 uppercase" style={{ color: ROSE }}>
                {t.growthLabel}
              </p>
              <h2
                className="font-bold mb-14"
                style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(40px, 5vw, 60px)", color: "#fff" }}
              >
                {t.journey}
              </h2>
            </FadeUp>

            <div className="relative">
              <div
                className="absolute top-5 left-0 right-0 h-px"
                style={{ background: "rgba(227,199,202,0.15)" }}
              />
              <div className="grid grid-cols-5 gap-5">
                {t.journeyItems.map((item, i) => (
                  <FadeUp key={item.year} delay={i * 0.12}>
                    <div className="pt-12">
                      <div
                        className="w-2.5 h-2.5 rounded-full mb-5 -mt-[52px]"
                        style={{ background: ROSE }}
                      />
                      <span
                        className="block mb-2 font-bold"
                        style={{ fontFamily: "'Playfair Display', serif", fontSize: "22px", color: ROSE }}
                      >
                        {item.year}
                      </span>
                      <span className="block text-xs font-semibold tracking-wider mb-2" style={{ color: "#fff" }}>
                        {item.title}
                      </span>
                      <p className="text-xs leading-relaxed" style={{ color: "rgba(255,255,255,0.45)" }}>
                        {item.desc}
                      </p>
                    </div>
                  </FadeUp>
                ))}
              </div>
            </div>

            <FadeUp delay={0.65}>
              <div
                className="mt-14 px-8 py-5 rounded-2xl"
                style={{
                  background: "rgba(227,199,202,0.07)",
                  border: "1px solid rgba(227,199,202,0.15)",
                }}
              >
                <p className="text-sm italic text-center" style={{ color: "rgba(255,255,255,0.5)" }}>
                  "The best and most beautiful things in the world cannot be seen or even touched — they must be felt with the heart."
                </p>
              </div>
            </FadeUp>
          </div>
        </section>

        {/* ── SECTION 4: VISION & MISSION ───────────────────────────────── */}
        <section
          data-section="3"
          className="relative w-full min-h-[760px] py-20 flex items-center overflow-hidden"
          style={{ scrollSnapAlign: "start", background: "#fff" }}
        >
          <div className="w-full max-w-7xl mx-auto px-10 grid grid-cols-1 md:grid-cols-2">
            <SlideIn fromLeft delay={0} className="flex flex-col justify-center pr-14 border-r" style={{ borderColor: "rgba(227,199,202,0.3)", borderRightStyle: "solid", borderRightWidth: "1px" }}>
              <p className="text-xs tracking-[0.4em] mb-4 uppercase" style={{ color: DEEP_ROSE }}>
                {t.visionLabel}
              </p>
              <h2
                className="font-bold mb-5"
                style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(44px, 6vw, 72px)", color: DARK, lineHeight: 1 }}
              >
                {t.visionTitle}
              </h2>
              <div className="w-10 h-px mb-7" style={{ background: ROSE }} />
              <p className="text-lg leading-relaxed mb-6" style={{ color: "#5a4a4c" }}>
                "{t.vision}"
              </p>
              <p
                className="text-base font-semibold"
                style={{ color: DEEP_ROSE }}
              >
                {t.visionLine}
              </p>

              <div className="mt-10">
                <img
                  src={visionImage}
                  alt="Premium beauty products"
                  className="rounded-2xl w-full object-cover"
                  style={{ height: "160px" }}
                />
              </div>
            </SlideIn>

            <SlideIn delay={0.15} className="flex flex-col justify-center pl-14">
              <h2
                className="font-bold mb-5"
                style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(44px, 6vw, 72px)", color: DARK, lineHeight: 1 }}
              >
                {t.missionTitle}
              </h2>
              <div className="w-10 h-px mb-7" style={{ background: ROSE }} />
              <div className="space-y-6">
                {[
                  ...t.missions,
                ].map((text, i) => (
                  <FadeUp key={i} delay={0.2 + i * 0.12}>
                    <div className="flex items-start gap-5">
                      <div
                        className="w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 text-xs font-bold"
                        style={{ background: ROSE, color: DARK }}
                      >
                        {i + 1}
                      </div>
                      <p className="text-base leading-relaxed" style={{ color: "#5a4a4c" }}>{text}</p>
                    </div>
                  </FadeUp>
                ))}
              </div>

              <FadeUp delay={0.6}>
                <div
                  className="mt-10 p-6 rounded-2xl"
                  style={{ background: "rgba(227,199,202,0.12)" }}
                >
                  <p className="text-sm italic" style={{ color: "#8a7a7c" }}>
                    "The supreme happiness in life is the conviction that we are loved."
                  </p>
                </div>
              </FadeUp>
            </SlideIn>
          </div>
        </section>

        {/* ── SECTION 5: WHY NPEOPLE ────────────────────────────────────── */}
        <section
          data-section="4"
          className="w-full min-h-[740px] py-20 flex items-center overflow-hidden"
          style={{
            scrollSnapAlign: "start",
            background: `linear-gradient(150deg, ${ROSE} 0%, #f5ede8 55%, ${CREAM} 100%)`,
          }}
        >
          <div className="w-full max-w-7xl mx-auto px-10">
            <FadeUp>
              <p className="text-xs tracking-[0.4em] mb-4 uppercase" style={{ color: "#8a6a6c" }}>
                {t.whyLabel}
              </p>
              <h2
                className="font-bold mb-3"
                style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(44px, 6vw, 72px)", color: DARK }}
              >
                {t.whyTitle}
              </h2>
              <p className="text-sm mb-12" style={{ color: "#8a6a6c" }}>
                {t.whyLead}
              </p>
            </FadeUp>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
              {t.whyItems.map((item, i) => (
                <FadeUp key={item.num} delay={i * 0.12}>
                  <div
                    className="rounded-3xl p-8 h-full flex flex-col transition-all duration-300 hover:-translate-y-2 cursor-pointer"
                    style={{
                      background: "rgba(255,255,255,0.7)",
                      backdropFilter: "blur(12px)",
                      boxShadow: "0 8px 40px rgba(26,21,18,0.07)",
                      border: "1px solid rgba(255,255,255,0.8)",
                    }}
                  >
                    <span
                      className="text-5xl font-bold mb-6 block leading-none"
                      style={{ fontFamily: "'Playfair Display', serif", color: "rgba(227,199,202,0.6)" }}
                    >
                      {item.num}
                    </span>
                    <h3
                      className="font-semibold text-base mb-3"
                      style={{ color: DARK }}
                    >
                      {item.title}
                    </h3>
                    <p className="text-sm leading-relaxed flex-1" style={{ color: "#8a7a7c" }}>
                      {item.desc}
                    </p>
                  </div>
                </FadeUp>
              ))}
            </div>
          </div>
        </section>

        {/* ── SECTION 6: CORE VALUES ────────────────────────────────────── */}
        <section
          data-section="5"
          className="w-full min-h-[740px] py-20 flex items-center overflow-hidden"
          style={{ scrollSnapAlign: "start", background: DARK }}
        >
          <div className="w-full max-w-7xl mx-auto px-10">
            <FadeUp>
              <p className="text-xs tracking-[0.4em] mb-4 uppercase" style={{ color: ROSE }}>
                {t.valuesLabel}
              </p>
              <h2
                className="font-bold mb-14"
                style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(44px, 6vw, 72px)", color: "#fff" }}
              >
                {t.valuesTitle}
              </h2>
            </FadeUp>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {t.valueItems.map((v, i) => (
                <FadeUp key={v.en} delay={i * 0.12}>
                  <div
                    className="rounded-2xl p-7 h-full flex flex-col border-t-2 transition-all duration-300 hover:-translate-y-1 cursor-default"
                    style={{
                      background: "rgba(255,255,255,0.05)",
                      borderColor: [ROSE, DEEP_ROSE, "#a89ea0", "#8a7a7c"][i],
                      border: `1px solid rgba(255,255,255,0.07)`,
                      borderTop: `2px solid ${[ROSE, DEEP_ROSE, "#a89ea0", "#8a7a7c"][i]}`,
                    }}
                  >
                    <span
                      className="text-xs tracking-widest mb-3 block"
                      style={{ color: [ROSE, DEEP_ROSE, "#a89ea0", "#8a7a7c"][i] }}
                    >
                      {v.ko}
                    </span>
                    <h3
                      className="text-xl font-semibold mb-4"
                      style={{ fontFamily: "'Playfair Display', serif", color: "#fff" }}
                    >
                      {v.en}
                    </h3>
                    <p className="text-sm leading-relaxed flex-1" style={{ color: "rgba(255,255,255,0.45)" }}>
                      {v.desc}
                    </p>
                  </div>
                </FadeUp>
              ))}
            </div>

            <FadeUp delay={0.55}>
              <div
                className="mt-10 flex items-center gap-6 p-6 rounded-2xl"
                style={{ background: "rgba(227,199,202,0.08)", border: "1px solid rgba(227,199,202,0.15)" }}
              >
                <img
                  src={aboutImage}
                  alt="Beauty products"
                  className="rounded-xl object-cover flex-shrink-0"
                  style={{ width: "120px", height: "80px" }}
                />
                <p className="text-sm italic" style={{ color: "rgba(255,255,255,0.5)" }}>
                  {t.closing}
                </p>
              </div>
            </FadeUp>
          </div>
        </section>

        {/* ── SECTION 7: BRAND NETWORK ─────────────────────────────────── */}
        <section
          data-section="6"
          className="relative w-full min-h-[760px] py-20 flex items-center overflow-hidden"
          style={{
            scrollSnapAlign: "start",
            background: "linear-gradient(135deg, #fbf8f6 0%, #f3e8ea 46%, #ffffff 100%)",
          }}
        >
          <div
            className="absolute inset-0 bg-cover bg-center opacity-[0.08]"
            style={{ backgroundImage: `url(${globalExportImage})` }}
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                "radial-gradient(circle at 10% 10%, rgba(227,199,202,0.48), transparent 30%), radial-gradient(circle at 88% 82%, rgba(184,159,162,0.2), transparent 34%)",
            }}
          />
          <div className="relative w-full max-w-7xl mx-auto px-10">
            <FadeUp>
              <p className="text-xs tracking-[0.4em] mb-4 uppercase" style={{ color: DEEP_ROSE }}>
                {t.brandLabel}
              </p>
              <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-12 items-end mb-10">
                <div>
                  <h2
                    className="font-bold leading-none whitespace-nowrap"
                    style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(34px, 4.6vw, 60px)", color: DARK }}
                  >
                    {t.brandTitle}
                  </h2>
                  <p className="text-sm leading-relaxed mt-5 max-w-2xl" style={{ color: "#8a7a7c" }}>
                    {t.brandLead}
                  </p>
                </div>
                <div className="grid grid-cols-3 border-y" style={{ borderColor: "rgba(26,21,18,0.12)" }}>
                  {t.stats.map((item) => (
                    <div
                      key={item.label}
                      className="px-5 py-5 border-r last:border-r-0"
                      style={{ borderColor: "rgba(26,21,18,0.12)" }}
                    >
                      <p
                        className="font-bold leading-none mb-2"
                        style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(26px, 3vw, 40px)", color: DARK }}
                      >
                        {item.value}
                      </p>
                      <p className="text-[10px] tracking-[0.24em] uppercase" style={{ color: DEEP_ROSE }}>
                        {item.label}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </FadeUp>

            <FadeUp delay={0.15}>
              <div className="brand-panel">
                <div className="flex items-center justify-between gap-8 mb-5 px-1">
                  <p className="text-xs tracking-[0.32em] uppercase" style={{ color: DEEP_ROSE }}>
                    {t.portfolio}
                  </p>
                  <p className="text-xs hidden md:block" style={{ color: "#8a7a7c" }}>
                    {t.portfolioCategories}
                  </p>
                </div>
                <div className="brand-flow">
                  {BRAND_ROWS.map((row, rowIndex) => (
                    <div
                      key={rowIndex}
                      className="brand-flow-row"
                      style={{ animationDirection: rowIndex === 0 ? "normal" : "reverse" }}
                    >
                      {[...row, ...row].map((brand, i) => (
                        <div className="brand-card" key={`${brand.name}-${rowIndex}-${i}`}>
                          {brand.logo ? (
                            <img
                              className={`brand-logo ${brand.logoClass ?? ""}`}
                              src={brand.logo}
                              alt={`${brand.name} logo`}
                            />
                          ) : (
                            <span className="brand-text-logo">{brand.name}</span>
                          )}
                        </div>
                      ))}
                    </div>
                  ))}
                </div>
              </div>
            </FadeUp>
          </div>
        </section>

        {/* ── SECTION 8: PRODUCTS ───────────────────────────────────────── */}
        <section
          data-section="7"
          className="w-full min-h-[760px] py-20 flex items-center overflow-hidden"
          style={{ scrollSnapAlign: "start", background: CREAM }}
        >
          <div className="w-full max-w-7xl mx-auto px-10">
            <FadeUp>
              <p className="text-xs tracking-[0.4em] mb-4 uppercase" style={{ color: DEEP_ROSE }}>
                {t.productLabel}
              </p>
              <div className="flex items-end justify-between mb-12">
                <h2
                  className="font-bold"
                  style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(44px, 6vw, 72px)", color: DARK, lineHeight: 1 }}
                >
                  {t.productTitle}
                </h2>
                <p className="text-sm max-w-xs text-right hidden md:block" style={{ color: "#8a7a7c" }}>
                  {t.productLead}
                </p>
              </div>
            </FadeUp>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {t.productCategories.map((cat, i) => (
                <FadeUp key={cat.code} delay={i * 0.1}>
                  <div
                    className="rounded-2xl overflow-hidden relative group cursor-pointer transition-all duration-400 hover:scale-[1.02]"
                    style={{ height: "300px" }}
                  >
                    <img
                      src={[skincareImage, hairBodyImage, supplementsImage, innerBeautyImage][i]}
                      alt={cat.title}
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div
                      className="absolute inset-0 transition-opacity duration-300"
                      style={{ background: `${[ROSE, DEEP_ROSE, "#a89ea0", "#8a7a7c"][i]}cc` }}
                    />
                    <div className="absolute inset-0 p-6 flex flex-col justify-between">
                      <span
                        className="font-bold leading-none"
                        style={{
                          fontFamily: "'Playfair Display', serif",
                          fontSize: "48px",
                          color: "rgba(255,255,255,0.2)",
                        }}
                      >
                        {cat.code}
                      </span>
                      <div>
                        <p className="text-xs tracking-widest mb-1" style={{ color: "rgba(255,255,255,0.7)" }}>
                          {cat.sub}
                        </p>
                        <h3 className="font-semibold text-lg mb-3" style={{ color: "#fff" }}>
                          {cat.title}
                        </h3>
                        <ul className="space-y-1">
                          {cat.items.map((item) => (
                            <li key={item} className="text-xs" style={{ color: "rgba(255,255,255,0.75)" }}>
                              · {item}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </FadeUp>
              ))}
            </div>
          </div>
        </section>

        {/* ── SECTION 9: GLOBAL NETWORK ─────────────────────────────────── */}
        <section
          data-section="8"
          className="w-full min-h-[760px] py-20 flex items-center overflow-hidden"
          style={{
            scrollSnapAlign: "start",
            background: `linear-gradient(160deg, ${CREAM} 0%, rgba(227,199,202,0.25) 100%)`,
          }}
        >
          <div className="w-full max-w-7xl mx-auto px-10 grid grid-cols-1 md:grid-cols-2 gap-14 items-center">
            <SlideIn fromLeft delay={0}>
              <p className="text-xs tracking-[0.4em] mb-4 uppercase" style={{ color: DEEP_ROSE }}>
                {t.globalLabel}
              </p>
              <h2
                className="font-bold mb-4"
                style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(44px, 6vw, 72px)", color: DARK, lineHeight: 1 }}
              >
                {t.globalTitle}
              </h2>
              <div className="w-10 h-px mb-6" style={{ background: ROSE }} />
              <p className="text-sm leading-relaxed mb-10" style={{ color: "#5a4a4c" }}>
                {t.globalLead}
              </p>

              <div className="grid grid-cols-2 gap-3">
                {t.globalRegions.map((item, i) => (
                  <FadeUp key={item.region} delay={0.1 + i * 0.1}>
                    <div
                      className="rounded-xl p-4"
                      style={{
                        background: "rgba(255,255,255,0.7)",
                        border: "1px solid rgba(227,199,202,0.4)",
                        backdropFilter: "blur(8px)",
                      }}
                    >
                      <span className="text-2xl mb-2 block">{item.icon}</span>
                      <p className="text-sm font-semibold mb-1" style={{ color: DARK }}>{item.region}</p>
                      <p className="text-xs" style={{ color: "#8a7a7c" }}>{item.countries}</p>
                    </div>
                  </FadeUp>
                ))}
              </div>

              <FadeUp delay={0.55}>
                <div
                  className="mt-4 rounded-xl p-4 flex items-center gap-3"
                  style={{ background: ROSE }}
                >
                  <Globe className="w-5 h-5 flex-shrink-0" style={{ color: DARK }} />
                  <div>
                    <p className="text-xs font-semibold" style={{ color: DARK }}>Expanding Worldwide</p>
                    <p className="text-xs" style={{ color: "rgba(26,21,18,0.65)" }}>
                      Côte d'Ivoire · Ghana · and more to come
                    </p>
                  </div>
                </div>
              </FadeUp>
            </SlideIn>

            <SlideIn delay={0.2}>
              <div className="relative h-full flex flex-col justify-center">
                <div
                  className="relative rounded-3xl overflow-hidden"
                  style={{ height: "420px", background: DARK }}
                >
                  <img
                    src={globalExportImage}
                    alt="Global K-beauty export"
                    className="w-full h-full object-cover opacity-60"
                  />
                  <div className="absolute inset-0 flex flex-col justify-end p-8">
                    <p
                      className="text-5xl font-bold mb-1"
                      style={{ fontFamily: "'Playfair Display', serif", color: "#fff" }}
                    >
                      10+
                    </p>
                    <p className="text-sm" style={{ color: "rgba(255,255,255,0.6)" }}>
                      {t.countriesLabel}
                    </p>
                    <div className="mt-4 flex flex-wrap gap-2">
                      {t.countryTags.map((c) => (
                        <span
                          key={c}
                          className="text-xs px-3 py-1 rounded-full"
                          style={{ background: "rgba(227,199,202,0.2)", color: ROSE }}
                        >
                          {c}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </SlideIn>
          </div>
        </section>

        {/* ── SECTION 10: CONTACT ───────────────────────────────────────── */}
        <section
          data-section="9"
          className="relative w-full min-h-[780px] py-20 pb-28 flex items-center overflow-hidden"
          style={{ scrollSnapAlign: "start", background: "#fff" }}
        >
          <div className="w-full max-w-7xl mx-auto px-10 grid grid-cols-1 md:grid-cols-2 gap-14 items-center">
            <SlideIn fromLeft delay={0}>
              <p className="text-xs tracking-[0.4em] mb-4 uppercase" style={{ color: DEEP_ROSE }}>
                {t.contactLabel}
              </p>
              <h2
                className="font-bold mb-3 leading-none"
                style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(44px, 6vw, 72px)", color: DARK }}
              >
                {t.contactTitle}
              </h2>
              <div className="w-10 h-px mb-8" style={{ background: ROSE }} />

              <div className="space-y-5">
                {[
                  {
                    Icon: MapPin,
                    label: t.contactItems.address,
                    value: "SKY-L65 #915, 200 Wangsan-ro, Dongdaemun-gu, Seoul, Korea",
                    href: undefined,
                  },
                  {
                    Icon: Mail,
                    label: t.contactItems.email,
                    value: CONTACT_EMAIL,
                    href: `mailto:${CONTACT_EMAIL}`,
                  },
                  {
                    Icon: Phone,
                    label: t.contactItems.whatsapp,
                    value: "+82-10-3392-2533",
                    href: "https://wa.me/821033922533",
                  },
                  {
                    Icon: MessageCircle,
                    label: t.contactItems.messenger,
                    value: "KakaoTalk: funbuy  ·  WeChat: daoncom",
                    href: undefined,
                  },
                  {
                    Icon: Instagram,
                    label: t.contactItems.instagram,
                    value: "@npeople_",
                    href: "https://instagram.com/npeople_",
                  },
                ].map(({ Icon, label, value, href }) => (
                  <FadeUp key={label} delay={0.1}>
                    <div className="flex items-start gap-4">
                      <div
                        className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0"
                        style={{ background: "rgba(227,199,202,0.2)" }}
                      >
                        <Icon className="w-4 h-4" style={{ color: DEEP_ROSE }} />
                      </div>
                      <div>
                        <p className="text-[10px] tracking-[0.25em] mb-0.5" style={{ color: DEEP_ROSE }}>
                          {label}
                        </p>
                        {href ? (
                          <a href={href} className="text-sm hover:underline" style={{ color: DARK }}>
                            {value}
                          </a>
                        ) : (
                          <p className="text-sm" style={{ color: DARK }}>{value}</p>
                        )}
                      </div>
                    </div>
                  </FadeUp>
                ))}
              </div>

              <FadeUp delay={0.6}>
                <div className="mt-10 flex items-center gap-4">
                  <button
                    onClick={openContactModal}
                    className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full text-sm font-semibold tracking-wider transition-all duration-300 hover:scale-105 hover:shadow-lg"
                    style={{ background: ROSE, color: DARK }}
                  >
                    {t.contact} <ArrowRight className="w-4 h-4" />
                  </button>
                  <a
                    href="https://wa.me/821033922533"
                    className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full text-sm font-semibold tracking-wider border transition-all duration-300 hover:scale-105"
                    style={{ borderColor: ROSE, color: DARK }}
                  >
                    WhatsApp
                  </a>
                </div>
              </FadeUp>
            </SlideIn>

            <SlideIn delay={0.2}>
              <div className="relative">
                <div
                  className="absolute -top-6 -right-6 w-full h-full rounded-3xl"
                  style={{ background: "rgba(227,199,202,0.15)" }}
                />
                <div className="relative rounded-3xl overflow-hidden" style={{ height: "520px" }}>
                  <img
                    src={contactImage}
                    alt="K-beauty products"
                    className="w-full h-full object-cover"
                  />
                  <div
                    className="absolute bottom-0 left-0 right-0 p-8"
                    style={{
                      background: "linear-gradient(transparent, rgba(26,21,18,0.85))",
                    }}
                  >
                    <p
                      className="text-2xl font-bold mb-2 text-white"
                      style={{ fontFamily: "'Playfair Display', serif" }}
                    >
                      Npeople Co., Ltd
                    </p>
                    <p className="text-sm italic" style={{ color: "rgba(255,255,255,0.7)" }}>
                      {t.closing}
                    </p>
                  </div>
                </div>

                <div
                  className="absolute -bottom-5 -left-5 rounded-2xl px-6 py-4 flex items-center gap-4"
                  style={{ background: DARK }}
                >
                  <ImageWithFallback
                    src={logoImg}
                    alt="Npeople"
                    className="w-10 h-10 object-contain"
                  />
                  <div>
                    <p className="text-xs font-bold tracking-widest" style={{ color: ROSE }}>NPEOPLE</p>
                    <p className="text-xs" style={{ color: "rgba(255,255,255,0.5)" }}>Global K-Beauty Partner</p>
                  </div>
                </div>
              </div>
            </SlideIn>
          </div>
          <div
            className="absolute left-10 right-10 bottom-5 flex items-center justify-center pt-4 text-[11px] tracking-[0.12em]"
            style={{ borderTop: "1px solid rgba(227,199,202,0.45)", color: "#8a7a7c" }}
          >
            <span>© 2026 Npeople Co., Ltd. All rights reserved.</span>
          </div>
        </section>
      </div>

      {contactOpen && (
        <div
          className="fixed inset-0 z-[80] flex items-center justify-center px-5"
          style={{ background: "rgba(26,21,18,0.45)", backdropFilter: "blur(10px)" }}
          onClick={() => setContactOpen(false)}
        >
          <div
            className="relative w-full max-w-xl rounded-3xl p-8 shadow-2xl"
            style={{
              background: "linear-gradient(145deg, rgba(250,248,246,0.98), rgba(255,255,255,0.96))",
              border: "1px solid rgba(227,199,202,0.6)",
            }}
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setContactOpen(false)}
              className="absolute right-5 top-5 flex h-9 w-9 items-center justify-center rounded-full text-sm font-semibold transition-all duration-300 hover:scale-105"
              style={{ background: "rgba(227,199,202,0.22)", color: DARK }}
              aria-label={t.contactForm.close}
            >
              X
            </button>

            <p className="text-xs tracking-[0.36em] uppercase mb-4" style={{ color: DEEP_ROSE }}>
              NPEOPLE
            </p>
            <h2
              className="font-bold mb-3 leading-none"
              style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(36px, 5vw, 56px)", color: DARK }}
            >
              {t.contactForm.title}
            </h2>
            <p className="text-sm leading-relaxed mb-7" style={{ color: "#8a7a7c" }}>
              {t.contactForm.intro}
            </p>

            <form className="space-y-4" onSubmit={handleContactSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <label className="grid gap-2 text-xs font-semibold tracking-[0.16em]" style={{ color: DEEP_ROSE }}>
                  {t.contactForm.name}
                  <input
                    name="name"
                    required
                    className="rounded-2xl px-4 py-3 text-sm outline-none"
                    style={{ background: "#fff", border: "1px solid rgba(227,199,202,0.5)", color: DARK }}
                  />
                </label>
                <label className="grid gap-2 text-xs font-semibold tracking-[0.16em]" style={{ color: DEEP_ROSE }}>
                  {t.contactForm.company}
                  <input
                    name="company"
                    className="rounded-2xl px-4 py-3 text-sm outline-none"
                    style={{ background: "#fff", border: "1px solid rgba(227,199,202,0.5)", color: DARK }}
                  />
                </label>
              </div>
              <label className="grid gap-2 text-xs font-semibold tracking-[0.16em]" style={{ color: DEEP_ROSE }}>
                {t.contactForm.email}
                <input
                  name="email"
                  type="email"
                  required
                  className="rounded-2xl px-4 py-3 text-sm outline-none"
                  style={{ background: "#fff", border: "1px solid rgba(227,199,202,0.5)", color: DARK }}
                />
              </label>
              <label className="grid gap-2 text-xs font-semibold tracking-[0.16em]" style={{ color: DEEP_ROSE }}>
                {t.contactForm.message}
                <textarea
                  name="message"
                  required
                  rows={5}
                  className="resize-none rounded-2xl px-4 py-3 text-sm outline-none"
                  style={{ background: "#fff", border: "1px solid rgba(227,199,202,0.5)", color: DARK }}
                />
              </label>
              <button
                type="submit"
                disabled={contactStatus === "sending"}
                className="inline-flex w-full items-center justify-center gap-2 rounded-full px-7 py-3.5 text-sm font-semibold tracking-wider transition-all duration-300 hover:scale-[1.01]"
                style={{
                  background: ROSE,
                  color: DARK,
                  opacity: contactStatus === "sending" ? 0.7 : 1,
                  cursor: contactStatus === "sending" ? "wait" : "pointer",
                }}
              >
                {contactStatus === "sending" ? t.contactForm.sending : t.contactForm.send}
                <ArrowRight className="w-4 h-4" />
              </button>
              {contactStatus !== "idle" && (
                <p
                  className="text-center text-sm"
                  style={{
                    color: contactStatus === "success" ? "#4f7b61" : "#9b4f58",
                  }}
                >
                  {contactStatus === "success"
                    ? t.contactForm.success
                    : FORMSPREE_ENDPOINT
                    ? t.contactForm.error
                    : t.contactForm.missingEndpoint}
                </p>
              )}
            </form>
          </div>
        </div>
      )}

      <style>{`
        @keyframes fadeDown {
          from { opacity: 0; transform: translateY(-20px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(24px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes scaleX {
          from { transform: scaleX(0); opacity: 0; }
          to   { transform: scaleX(1); opacity: 1; }
        }
        @keyframes brandFlow {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
        .brand-panel {
          position: relative;
          padding: 10px 0 8px;
        }
        .brand-flow {
          position: relative;
          display: grid;
          gap: 14px;
          overflow: hidden;
          padding: 10px 0;
        }
        .brand-flow::before,
        .brand-flow::after {
          position: absolute;
          top: 0;
          bottom: 0;
          z-index: 2;
          width: 72px;
          content: "";
          pointer-events: none;
        }
        .brand-flow::before {
          left: 0;
          background: linear-gradient(90deg, rgba(250,246,246,0.5), rgba(250,246,246,0));
        }
        .brand-flow::after {
          right: 0;
          background: linear-gradient(270deg, rgba(250,246,246,0.5), rgba(250,246,246,0));
        }
        .brand-flow-row {
          display: flex;
          width: max-content;
          animation: brandFlow 36s linear infinite;
          will-change: transform;
        }
        .brand-flow-row:hover {
          animation-play-state: paused;
        }
        .brand-card {
          display: inline-flex;
          width: 216px;
          height: 76px;
          align-items: center;
          justify-content: center;
          margin-right: 34px;
          padding: 14px 24px;
          background: transparent;
          transition: opacity 0.3s ease, transform 0.3s ease;
        }
        .brand-logo {
          display: block;
          max-width: 138px;
          max-height: 42px;
          object-fit: contain;
          opacity: 0.88;
          transition: opacity 0.3s ease, transform 0.3s ease;
        }
        .brand-logo-wide {
          max-width: 156px;
          max-height: 38px;
        }
        .brand-logo-square {
          max-width: 58px;
          max-height: 58px;
        }
        .brand-logo-calligraphy {
          max-width: 76px;
          max-height: 62px;
        }
        .brand-text-logo {
          color: rgba(26,21,18,0.62);
          font-family: 'Playfair Display', serif;
          font-size: 23px;
          font-weight: 800;
          letter-spacing: -0.04em;
          white-space: nowrap;
          transition: color 0.3s ease, transform 0.3s ease;
        }
        .brand-card:hover {
          transform: translateY(-2px);
        }
        .brand-card:hover .brand-logo,
        .brand-card:hover .brand-text-logo {
          opacity: 1;
          color: #1a1512;
          transform: translateY(-1px);
        }
        @media (max-width: 768px) {
          .brand-card {
            width: 156px;
            height: 64px;
            margin-right: 18px;
            padding: 14px 18px;
          }
          .brand-logo {
            max-width: 112px;
            max-height: 34px;
          }
          .brand-logo-wide {
            max-width: 124px;
            max-height: 32px;
          }
          .brand-logo-square {
            max-width: 48px;
            max-height: 48px;
          }
          .brand-logo-calligraphy {
            max-width: 58px;
            max-height: 50px;
          }
          .brand-text-logo {
            font-size: 18px;
          }
        }
        div::-webkit-scrollbar { display: none; }
        div { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </div>
  );
}
