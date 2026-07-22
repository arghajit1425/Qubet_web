import { Product, Banner, ProductAsset, Testimonial } from './types';

export const INITIAL_PRODUCTS: Product[] = [
  {
    id: 'p1',
    name: 'Veloura',
    subtitle: 'velvet and luxury',
    price: 599,
    currency: '$',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCN2TgXBSqj0fekSxXGaOaJVOSwA4ssfgoUt_IQOoFDgvDQPUftZh8UICHi6dcUO3bxXWJCwEEGfsqco1GYF2OZYJGbi_qp9JmnJ44GxZouYmFg-FztjaINLID5LjtAQbsJxHm01MWzg6P39DQ4Meui6qaagrahz5cgIm8ErCL4xrymkw6QD5r7SfUcVIeS3DFz_IVM1PdnaG0qYRY8zTn7gUIapAgWXf8hM8V_9qZEIb7JKeou6UiXq-vpNVdOa9a4avvU8Nlq8T4',
    description: 'A deep velvet fragrance encased in dark grey glass with subtle violet liquid and amber accords.',
    category: 'Perfume',
    sku: 'RE-2024-VL01',
    isBestSeller: true,
    rating: 5,
    notes: ['Velvet Amber', 'Dark Plum', 'Smokey Vanilla', 'Oud Wood']
  },
  {
    id: 'p2',
    name: 'Lumira',
    subtitle: 'glowing essence',
    price: 699,
    currency: '$',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDdWc1879yXZBPRzmF54M1siiy8sWywIwxw-I_wtU-kJf_FU7tA5KdxOxr7rjfBD4Pfa_fPFAUyhOD3puCVY4yt4CJh9cLSe2nlQrqXy38urnh3Q3n76dw3Y-zMQduTbMF0WDNpDgKLoK5br7CwyrdVoDouhZKialMebXQN3pDGtQdy3SGkYTzc8l1sGqHN7qCX2vgYlEAqxX3DOZ6GBR5_NiQ4kwpeU7i7bEDPPrA58WeAZJc0IJ7kdPInVmcrj5WylkE8kg-A-wk',
    description: 'A light golden elixir capturing radiant morning rays with airy botanical notes and soft jasmine.',
    category: 'Perfume',
    sku: 'RE-2024-LM02',
    isBestSeller: true,
    rating: 5,
    notes: ['Bergamot', 'Golden Rose', 'Citrus Blossom', 'White Amber']
  },
  {
    id: 'p3',
    name: 'Zafyre',
    subtitle: 'exotic and fiery',
    price: 799,
    currency: '$',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDCRKhe3ensRlu-by0y7JgsjKyZ9LxJU4cHHXC2nzLAlhICQ-mOxd2jaT2Z7cQpuw_leH7gFa_Uzv-hCBa-guDUpDTNAjKSd_R9FxTs6admubBPjW5Q9OltvMXHLcvRjjlaaHaERB2u4L10EpnB2LKk2eEHqzXwzLIpFjS-8WfzXBjeFA1fRvizYYwmy3Zr0MkDYWueJC6BbyPFApZTy3tQqvVKcpwg5NkF8cfDPGu277s-ett3hQ530LFy7FMgt9eyCSbEhy4qh6k',
    description: 'A sapphire-blue masterpiece possessing intense spice, cooling metallic notes, and deep cedar.',
    category: 'Perfume',
    sku: 'RE-2024-ZF03',
    isBestSeller: true,
    rating: 5,
    notes: ['Blue Lotus', 'Spiced Saffron', 'Atlas Cedar', 'Obsidian Musk']
  },
  {
    id: 'p4',
    name: 'Feresse',
    subtitle: 'fierce with a soft charm.',
    price: 1999,
    currency: '₹',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBeXaok-xZFGNjM__WxXtzp93QaRmvQhC22NERRxuLzmtVGYrHGRw6AYm32_m15llSCOZQ7LJNf-gKFUF1olG_ZbJbtoOtLynHagQOfFyDDQ2ReXdSvmiBn9YLRK_LjfR-u-OysdTf3unYIgBl65p3cCK2-CrvyZ6MfduH5YXY5VEE5htekTyKNrBBd0IpfWU_2VKuoMD4rDD-aPAxdLRuOWMH2Rbc_8sKsrpxa6nBM-HIXO5UANcFbSet6PSBXo9LEpYdUnrhUFS4',
    description: 'More than fragrance — it\'s a feeling. Our latest collection captures stories, emotions, and moments in every drop.',
    category: 'Collection',
    sku: 'RE-2024-FR04',
    isFeatured: true,
    rating: 5,
    notes: ['Blood Orange', 'Turkish Rose', 'Cashmere Wood', 'Vanilla Bean']
  },
  {
    id: 'p5',
    name: 'Duskira',
    subtitle: 'dusky and sensual.',
    price: 2199,
    currency: '₹',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBhihQrOrg7CrvqPaGSGQty5KclSUOYUmq4u6Iopjr21A3DzQo8-WW15C1PZnnB8sXMN04d2PfSg6lxs3lK_deT6uLGvOHGHcCb6JlNmnu97yA3WI5gif21LREtsHK7Qx1gkv7XL06C_3p3KHRlygj8edF5hC3mK8h4gdlrU9jenG6yw9COD7o5QtATuM1zmkeDiBYtGntpLdpZ9d7H6HlzF-UmYQ5gymFAeJMU1VhENXKfUwTdDj2xS2Q9ua0XMBb2vJJpTAG6E7Q',
    description: 'More than fragrance — it\'s a feeling. Mysterious dusk bottled in midnight obsidian with twilight iris and dark resin.',
    category: 'Collection',
    sku: 'RE-2024-DS05',
    isFeatured: true,
    rating: 5,
    notes: ['Midnight Iris', 'Black Orchid', 'Smoked Incense', 'Sandlewood']
  },
  {
    id: 'p6',
    name: 'AQUA MAJESTY',
    subtitle: 'dominate your day',
    price: 899,
    currency: '$',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDh7pcCwobQiUhTMRKfedLS4yGDutuzrJmjCvVPW0UdQ_sGrN6qSFqpJLtgkhDEQpX_4RP7I_xVO4HMQS-3jrr1IBmJcOKzN0PpfbfpALGf5AGWIZP7dqMWqsQWujqs9pGgVpfbwakLBNIlAk9jzN7aNrtT1gbCTeCx_JvL3JD9bRhzyhPySb6TLDx6_r_LRsAAySMEdAeVyh2P5F4UhMwgUxBv8I410jAffaLZNd-xeCAvK_Zm-N8OMP4A3zujuWCeSYpBO1jPpcU',
    description: 'The crowning achievement of the Royal Essence collection. Marine minerals and royal bergamot blended for supreme presence.',
    category: 'Perfume',
    sku: 'RE-2024-AM06',
    rating: 5,
    notes: ['Sea Breeze Accord', 'Calabrian Bergamot', 'Royal Ambergris', 'Cedarwood']
  }
];

export const INITIAL_BANNERS: Banner[] = [
  {
    id: 'b1',
    title: 'Home Page Main Hero',
    resolution: '2560 x 1080 px',
    updated: 'Updated 2 days ago',
    status: 'Live',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDzUUhwZ8qD3DsofCKlzF-JtFYb0psBvQzGmIK9mDDTvMZDoVn_A9Id3bOjcXHWDRXOlVlKRZCnALstgyaBeKdh69zvQNi3wrTAqC5JM1IVwSjthHljPITYsZAYCeCjRC62CD9m3IJm5-gO6hLi4FjQDnBQKw4ilW92V449Lh1LG97xniQ_Fp0DKGmqB_Dr9W-CgszQYGOEiIGftKCVM8UF0WEOX4If7sQYsd67g-ZSL78JdXYkRWpS_FnufNRzLhipFifDJSMv5YM'
  },
  {
    id: 'b2',
    title: 'Special Collections Promo',
    resolution: '1920 x 800 px',
    updated: 'Updated 1 week ago',
    status: 'Draft',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDqbbNF3o5dVwD0Uo6oNAwZocHdWvb3f1oIMXzR1ru9JI_Gd3uU3w04OAW1Z5NwcIR2zg12FBUCXGHEU4CPUtCo-UAeiE7uknsCVEvKUgNthI-kB3ZjuhZ2N11v-ZBeO60Cmgc_XR3hkDWdfKWhCBysFoI3hsycsPcebAwGPx2Zv5JjxMdKMiRJDl0CqP0tKhmAfLXMU89jtofwlQFD2sJlWPUd_VTAM30cRM7IZX_zghOyu8j5g-XSu50ZqOEUDF_APCOizRzFVo8'
  }
];

export const INITIAL_ASSETS: ProductAsset[] = [
  {
    id: 'a1',
    preview: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCYzKjiK7628gEgaeMf5W-DR4OR_S3zJW8MleB-PU-qsIjJLj7wI5gyZvMhKFSXUc_qtQ9ZkYHHajPidMgHSGw2OPSmjpe1wsmbuII80AizaDinQ1q5FGoXLd66_bJXMdTPOTexp2s6iRB-zwKTkCahgfmLAaqdXZrBtFekgS-DIkLS3XmvWRS1RuJCyiKu1etUVGq1S7W9_ATdwSFtV2VWHluFL-w1BrQhxBTldiI4noOAvq2YjXd7od-skBfMspVV2H6dGFzdI8E',
    productName: 'Midnight Jasmine No. 4',
    sku: 'SKU: RE-2024-MJ04',
    type: 'Main Product',
    resolution: '2000 x 2000 px'
  },
  {
    id: 'a2',
    preview: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDmVumB2LrrpI0m7r3pmbciwzpq8XUX4p5vNINyaabF7tlQstgdymHhiRquK5LZ2LY1lyuDkjzTPSPuPbHCu8W5VNUrG3xPxL5tDRw5q_xMRRoOLhD9DJtm1gBIyqz76bkJW-fIK36v_SFjjLnNhA_UKmk9Unfd7tw3nMwPPNasWY0JJ9pXWB34nWTunl_VUidyeq3w3JjoGdWPiUUzuxIduQMh6J30TOY3I297qkgce-52IU6Ua8PjG6YaSjP-ZstZgAsfDfSz-BI',
    productName: 'Royal Oud Intense',
    sku: 'SKU: RE-2024-RO88',
    type: 'Secondary',
    resolution: '2000 x 2000 px'
  },
  {
    id: 'a3',
    preview: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD02qxoSB2fHU4T7e46TRVmfeXM8haZW6gaNPLYe_QEzHVgL8qysb_4gXt3nJ92cX9e9NW51QfN2FqpHg4JnAox0QWYx5kwrW6M8IyAn4c_OkYrFlrHyrIrLFETxn-neNhooOXOtAZU31AjFp_lMPagpIGEIDHkZ-qdSNGwk2IjXeqDlooFm0S6n2Jwi6xkPxBYlWmY_kTJncxjFAqGd0fqEsL-8IeqVGBN2SgcO7pGRlPd5FsfZxuZ3i7bTHi53Vw5X4DiEUf2FY8',
    productName: 'Velvet Rose',
    sku: 'SKU: RE-2024-VR12',
    type: 'Marketing',
    resolution: '1080 x 1350 px'
  }
];

export const INITIAL_TESTIMONIALS: Testimonial[] = [
  {
    id: 't1',
    name: 'Rahul Sinha',
    location: 'Mumbai',
    quote: 'I bought "Veloura" and it instantly transported me to a place of pure luxury. The scent is deep, mysterious, and stays all day. Qubet really knows how to bottle a mood!',
    rating: 5
  },
  {
    id: 't2',
    name: 'Ishita Roy',
    location: 'Kolkata',
    quote: 'Qubet perfumes are pure magic! The scent lasts all day and I get so many compliments. It\'s become my signature daily fragrance.',
    rating: 5
  },
  {
    id: 't3',
    name: 'Tanya Bhatia',
    location: 'Bangalore',
    quote: 'The packaging is so premium and elegant. It feels like a luxury brand. Qubet is now my go-to for gifting and personal use. Simply exceptional.',
    rating: 5
  }
];

export const CATEGORIES_DATA = [
  {
    title: 'Perfume',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAbqt6NA4LGDJPPAYaO0sy0MnBUnMea3dJHs09cw4LXdUHWbYi9V1n8nz1JFqXe_GgKqqYlhm8dxBclgZgm0cbkh2L9pmH2eTgrjo1ln8wam7DklRAlZyeJ8rBPNceUrvnV9-UzeXcBtsPWj7JkMFODBt_K0XUX_SqdgNXRbxJX8hQ2Jj558tio1W88bLw9Of9kNPZjnLeuqpG_FCN9th7ytTMIIOvSmEs0ToKCqw97GvC1G8oq8aJg0QS0lm2X5f2QBpIxnS71N5Y',
    desc: 'Pure parfum extraits & signature scents'
  },
  {
    title: 'Collection',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCHIjnEi3RnYrz3DaA0tabigSECuFwgaz447lmdgd_WhKrVXvMFnCs_stNb_mYqioit24_oLQTaY92DzQNaxdKkmaXOT-K8XHpX7BfPkxTsFkW_atWU_7OGuq6cn-16utQxoe0A__XRHIfw0_wp-8jwn88xfxpnune3qXFH2x2dR1fsgcie0Eo556uHeVXIGzLoggsrI7jJ5iuKk1aiCPoGP_ncpWxDSoAboqe_VmBeHprNpXpcMLqqq_anTKoUyYL5HzV8SxAPaHM',
    desc: 'Curated gift boxes & discovery sets'
  },
  {
    title: 'Accessories',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCoWXX9jf79hwDRsQFrl6gB_BkTzW2xiM7BhgqaNd8_UYuDJ_1SMezf_5cUSWPIxV7RHFEgXw9VYrdtNctYCF_mjVc2juxTkvAItgu0pvogBeC_F3PyXX_aa-dtzj7mowHIHJe9PfYJkhyFy7Qctpz27AJ7fpeJWyzBY4imAwGgbJbJqgJGYgDyoToYfEaMStaa1uP3qIKvYMntazNP2MBYfWMCBRXRqyJoXZsR5Xf5JNFKpMOOVheh7sQ6SQTfCpzEJN_g-F0CcRA',
    desc: 'Golden travel atomizers & solid perfumes'
  },
  {
    title: 'News',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBNtCRU4rJXzK34baqE1ncdoZ-_O1g2qZEY2DTZQSRFfSQKCp3LCf7opv6vkuGFElMOscMzE08EEpqryJ_pHhnPx2sIuGkaB6nay10WovE0nn0REqGFIhI2gaj6KaoAhpsjc1LXIceMejPr6M23PdclY0rtobK6KKkruDtsa9sax7w3jZlYGRtcP1TQP9mVGR0UgrmHZwgb0s7Sc4hn_cq_4ZfkGF0fSPOwEWTawD6BAZJVPsfpt8cj9vMBxjxzlM2ZMO6ANgr1spk',
    desc: 'Editorial features, releases & scent stories'
  }
];
