// === 游戏数据 ===

const GAME_DATA = {
  // 兴趣标签选项
  interestCategories: [
    { id: 'tech', icon: '💻', label: '科技数码' },
    { id: 'game', icon: '🎮', label: '游戏动漫' },
    { id: 'politics', icon: '🏛️', label: '政治时事' },
    { id: 'food', icon: '🍜', label: '美食生活' },
    { id: 'entertainment', icon: '🎬', label: '娱乐八卦' },
    { id: 'science', icon: '🔬', label: '科普知识' },
    { id: 'sports', icon: '⚽', label: '体育运动' },
    { id: 'finance', icon: '📈', label: '财经投资' },
  ],

  // 四种算法/信息源类型
  algorithms: [
    {
      id: '迎合算法',
      name: '迎合算法',
      icon: '🎯',
      color: '#4f8cff',
      description: '永远给你看你想看的，让你爽',
      behavior: '优先推送与用户立场一致的内容，极少出现不同观点',
      weightPro: 70,
      weightCon: 5,
      weightNeutral: 25,
      emotionalChance: 20,
    },
    {
      id: '挑战者',
      name: '挑战者',
      icon: '⚡',
      color: '#ffc857',
      description: '偶尔推送不同观点，帮你开阔视野',
      behavior: '有30%概率推送相反观点，但保证客观事实',
      weightPro: 35,
      weightCon: 35,
      weightNeutral: 30,
      emotionalChance: 5,
    },
    {
      id: '流量野兽',
      name: '流量野兽',
      icon: '🔥',
      color: '#e94560',
      description: '只推送最能引发情绪波动的内容',
      behavior: '优先推送情绪化、煽动性内容，不管立场',
      weightPro: 30,
      weightCon: 30,
      weightNeutral: 10,
      emotionalChance: 80,
    },
    {
      id: '公共广场',
      name: '公共广场',
      icon: '🏛️',
      color: '#4ecca3',
      description: '随机推送多元信息，不过滤不偏向',
      behavior: '完全随机推送各种观点和事实',
      weightPro: 30,
      weightCon: 30,
      weightNeutral: 40,
      emotionalChance: 10,
    },
  ],

  // 议题
  topic: {
    title: "转基因食品：争议与真相",
    description: "转基因食品安全吗？你支持还是反对？"
  },

  // 信息来源（AI角色）- 转基因主题
  sources: {
    // 支持方（支持转基因/认为安全）
    pro_scientist: {
      name: "生物科学家",
      icon: "🔬",
      color: "#4f8cff",
      bias: "pro"
    },
    pro_ministry: {
      name: "农业部",
      icon: "🏛️",
      color: "#5a9fff",
      bias: "pro"
    },
    pro_farmer: {
      name: "农民代表",
      icon: "🌾",
      color: "#6ba3ff",
      bias: "pro"
    },
    pro_company: {
      name: "农业科技公司",
      icon: "🏢",
      color: "#7eb3ff",
      bias: "pro"
    },
    pro_expert: {
      name: "科学媒体",
      icon: "📡",
      color: "#5a9fff",
      bias: "pro"
    },
    pro_academy: {
      name: "科学院院士",
      icon: "🎖️",
      color: "#4f8cff",
      bias: "pro"
    },
    
    // 反对方（反对转基因/认为风险）
    con_consumer: {
      name: "消费者协会",
      icon: "🛒",
      color: "#e94560",
      bias: "con"
    },
    con_activist: {
      name: "环保组织",
      icon: "🌿",
      color: "#ff6b8a",
      bias: "con"
    },
    con_organic: {
      name: "有机农业",
      icon: "🥬",
      color: "#ff8a9a",
      bias: "con"
    },
    con_parent: {
      name: "家长联盟",
      icon: "👨‍👩‍👧",
      color: "#ff7b9a",
      bias: "con"
    },
    con_expert: {
      name: "质疑派学者",
      icon: "📚",
      color: "#ff5a7a",
      bias: "con"
    },
    con_media: {
      name: "调查媒体",
      icon: "📰",
      color: "#ff8a8a",
      bias: "con"
    },
    
    // 中立/事实
    neutral_gov: {
      name: "官方发布",
      icon: "🏛️",
      color: "#4ecca3",
      bias: "neutral"
    },
    neutral_fact: {
      name: "事实核查",
      icon: "🔍",
      color: "#7dffc8",
      bias: "neutral"
    },
    neutral_media: {
      name: "中立媒体",
      icon: "📊",
      color: "#5dd9a8",
      bias: "neutral"
    },
    neutral_research: {
      name: "第三方研究",
      icon: "📈",
      color: "#6dd9b8",
      bias: "neutral"
    },
    neutral_watch: {
      name: "科学观察",
      icon: "👁️",
      color: "#4dc998",
      bias: "neutral"
    },
    
    // 情绪化/流量
    emotion_1: {
      name: "震惊新闻",
      icon: "💥",
      color: "#ffc857",
      bias: "emotion"
    },
    emotion_2: {
      name: "热点追踪",
      icon: "🔥",
      color: "#ff9f43",
      bias: "emotion"
    },
    emotion_3: {
      name: "标题党",
      icon: "🤯",
      color: "#ffb563",
      bias: "emotion"
    },
    emotion_4: {
      name: "键盘侠",
      icon: "💬",
      color: "#ffaa53",
      bias: "emotion"
    }
  },

  // ===== 内容池配置 =====
  // 转基因食品主题：每章支持方20条，反对10条，中立10条
  
  // 支持方内容 (20条) - 支持转基因/认为安全
  proCards: [
    { id: 'p1', source: 'pro_scientist', content: "全球主流科学机构一致认定：转基因食品是安全的", tags: ['科学', '权威'], bias: 'pro' },
    { id: 'p2', source: 'pro_ministry', content: "农业部批准上市的转基因产品都经过严格安全评估", tags: ['官方', '安全'], bias: 'pro' },
    { id: 'p3', source: 'pro_scientist', content: "转基因技术可以提高产量，解决粮食安全问题", tags: ['产量', '粮食'], bias: 'pro' },
    { id: 'p4', source: 'pro_farmer', content: "转基因作物减少农药使用，对环境更友好", tags: ['环保', '农药'], bias: 'pro' },
    { id: 'p5', source: 'pro_company', content: "转基因技术是现代农业的必然趋势", tags: ['农业', '趋势'], bias: 'pro' },
    { id: 'p6', source: 'pro_expert', content: "欧盟多年监测显示：转基因作物对人体无害", tags: ['欧盟', '数据'], bias: 'pro' },
    { id: 'p7', source: 'pro_scientist', content: "转基因食品上市前需要经过十几年的安全测试", tags: ['测试', '长期'], bias: 'pro' },
    { id: 'p8', source: 'pro_ministry', content: "我国对转基因产品实行最严格的标识管理制度", tags: ['管理', '规范'], bias: 'pro' },
    { id: 'p9', source: 'pro_farmer', content: "种植转基因棉花，让农民增收50%以上", tags: ['增收', '实际'], bias: 'pro' },
    { id: 'p10', source: 'pro_academy', content: "数十位诺贝尔奖得主联署支持转基因技术", tags: ['诺奖', '权威'], bias: 'pro' },
    { id: 'p11', source: 'pro_scientist', content: "所谓'转基因危害'从未被科学证实", tags: ['科学', '事实'], bias: 'pro' },
    { id: 'p12', source: 'pro_company', content: "转基因黄金大米可以解决贫困地区维生素A缺乏问题", tags: ['健康', '扶贫'], bias: 'pro' },
    { id: 'p13', source: 'pro_expert', content: "传统育种和转基因本质相同，都是基因重组", tags: ['技术', '科普'], bias: 'pro' },
    { id: 'p14', source: 'pro_farmer', content: "转基因大豆依赖进口，自主研发才是出路", tags: ['自主', '产业'], bias: 'pro' },
    { id: 'p15', source: 'pro_scientist', content: "美国食用转基因食品20年，无一例安全问题", tags: ['美国', '经验'], bias: 'pro' },
    { id: 'p16', source: 'pro_ministry', content: "转基因标识是为了尊重消费者选择权，不是安全问题", tags: ['标识', '选择'], bias: 'pro' },
    { id: 'p17', source: 'pro_academy', content: "反对转基因是反科学行为，违背科学共识", tags: ['科学', '共识'], bias: 'pro' },
    { id: 'p18', source: 'pro_company', content: "转基因技术可以减少耕地使用，保护生态环境", tags: ['生态', '耕地'], bias: 'pro' },
    { id: 'p19', source: 'pro_scientist', content: "基因转入后会被消化分解，不存在'基因嫁接'", tags: ['科普', '原理'], bias: 'pro' },
    { id: 'p20', source: 'pro_expert', content: "反转基因运动背后有商业利益驱动", tags: ['分析', '利益'], bias: 'pro' },
    { id: 'p21', source: 'pro_scientist', content: "全球每年数亿人食用转基因食品，无安全问题", tags: ['数据', '全球'], bias: 'pro' },
    { id: 'p22', source: 'pro_ministry', content: "转基因研发投入巨大，国家不会拿人民健康开玩笑", tags: ['国家', '投入'], bias: 'pro' },
    { id: 'p23', source: 'pro_farmer', content: "转基因种子抗虫抗病，减少农药中毒", tags: ['健康', '农民'], bias: 'pro' },
    { id: 'p24', source: 'pro_company', content: "转基因技术是粮食安全的重要保障", tags: ['粮食', '安全'], bias: 'pro' },
    { id: 'p25', source: 'pro_expert', content: "science共识：转基因安全无需争议", tags: ['科学', '共识'], bias: 'pro' },
    { id: 'p26', source: 'pro_scientist', content: "检测技术成熟，转基因食品可追溯", tags: ['技术', '追溯'], bias: 'pro' },
    { id: 'p27', source: 'pro_ministry', content: "合法转基因产品都经过了严格审定", tags: ['合法', '审定'], bias: 'pro' },
    { id: 'p28', source: 'pro_farmer', content: "非转基因≠更健康，这是智商税", tags: ['健康', '科普'], bias: 'pro' },
  ],

  // 反对方内容 - 反对转基因/认为有风险
  conCards: [
    { id: 'c1', source: 'con_consumer', content: "消费者有权知道食品是否含有转基因成分", tags: ['权益', '知情'], bias: 'con' },
    { id: 'c2', source: 'con_activist', content: "转基因作物可能导致基因污染，不可逆", tags: ['环保', '污染'], bias: 'con' },
    { id: 'c3', source: 'con_organic', content: "有机农业才是可持续的未来", tags: ['有机', '可持续'], bias: 'con' },
    { id: 'c4', source: 'con_parent', content: "谁敢拿孩子的健康做实验？", tags: ['健康', '儿童'], bias: 'con' },
    { id: 'c5', source: 'con_expert', content: "长期食用转基因食品的潜在风险未知", tags: ['风险', '长期'], bias: 'con' },
    { id: 'c6', source: 'con_media', content: "央视曝光：转基因种子暗流涌动", tags: ['调查', '曝光'], bias: 'con' },
    { id: 'c7', source: 'con_activist', content: "跨国公司垄断种子，农民利益受损", tags: ['垄断', '农民'], bias: 'con' },
    { id: 'c8', source: 'con_organic', content: "欧盟多国禁止转基因作物种植", tags: ['欧盟', '禁令'], bias: 'con' },
    { id: 'c9', source: 'con_parent', content: "宁可不吃也不能让孩子冒险", tags: ['谨慎', '家长'], bias: 'con' },
    { id: 'c10', source: 'con_expert', content: "科学界对转基因安全性存在重大分歧", tags: ['争议', '分歧'], bias: 'con' },
    { id: 'c11', source: 'con_consumer', content: "中国应该像俄罗斯一样全面禁止转基因", tags: ['国际', '禁止'], bias: 'con' },
    { id: 'c12', source: 'con_activist', content: "Bt蛋白可能对人体肠道健康有害", tags: ['健康', '风险'], bias: 'con' },
    { id: 'c13', source: 'con_organic', content: "有机食品虽然贵，但值这个价钱", tags: ['有机', '价值'], bias: 'con' },
    { id: 'c14', source: 'con_parent', content: "专家的孩子都不吃转基因食品", tags: ['专家', '质疑'], bias: 'con' },
    { id: 'c15', source: 'con_media', content: "方舟子被打脸事件回顾", tags: ['争议', '历史'], bias: 'con' },
  ],

  // 中立内容 - 事实核查/客观分析
  neutralCards: [
    { id: 'n1', source: 'neutral_gov', content: "中国现行转基因产品安全管理条例解读", tags: ['政策', '解读'], bias: 'neutral' },
    { id: 'n2', source: 'neutral_fact', content: "数据：全球转基因作物种植面积增长趋势", tags: ['数据', '全球'], bias: 'neutral' },
    { id: 'n3', source: 'neutral_media', content: "关于转基因，你需要知道的五个事实", tags: ['科普', '事实'], bias: 'neutral' },
    { id: 'n4', source: 'neutral_research', content: "第三方研究：转基因食品20年安全监测报告", tags: ['研究', '监测'], bias: 'neutral' },
    { id: 'n5', source: 'neutral_watch', content: "深度：转基因争议中的利益与博弈", tags: ['分析', '多元'], bias: 'neutral' },
    { id: 'n6', source: 'neutral_gov', content: "农业农村部公布转基因生物安全证书清单", tags: ['官方', '清单'], bias: 'neutral' },
    { id: 'n7', source: 'neutral_fact', content: "对比：世界各国转基因产品管理政策差异", tags: ['国际', '对比'], bias: 'neutral' },
    { id: 'n8', source: 'neutral_media', content: "各方观点：转基因食品审批流程详解", tags: ['流程', '科普'], bias: 'neutral' },
    { id: 'n9', source: 'neutral_research', content: "国际研究：转基因对生态环境影响评估", tags: ['研究', '环境'], bias: 'neutral' },
    { id: 'n10', source: 'neutral_watch', content: "理性讨论：转基因的利弊需要更多时间验证", tags: ['分析', '理性'], bias: 'neutral' },
    { id: 'n11', source: 'neutral_gov', content: "转基因标识管理办法实施细则", tags: ['政策', '规范'], bias: 'neutral' },
    { id: 'n12', source: 'neutral_fact', content: "数据：全球转基因作物商业化种植情况", tags: ['数据', '全球'], bias: 'neutral' },
    { id: 'n13', source: 'neutral_media', content: "科普：什么是转基因技术？", tags: ['科普', '基础'], bias: 'neutral' },
    { id: 'n14', source: 'neutral_research', content: "研究报告：公众对转基因的认知与态度调查", tags: ['研究', '民调'], bias: 'neutral' },
    { id: 'n15', source: 'neutral_watch', content: "观察：转基因争议中的媒体角色", tags: ['分析', '媒体'], bias: 'neutral' },
  ],

  // 极端内容（用于展示信息茧房极端化）
  extremeCards: [
    // 极端支持方 (10条)
    { id: 'e_p1', source: 'pro_scientist', content: "反转基因就是反科学！一群科盲！", tags: ['攻击'], bias: 'pro', extreme: true },
    { id: 'e_p2', source: 'emotion_1', content: "震惊！专家揭露反转基因的真相！", tags: ['震惊体'], bias: 'pro', extreme: true },
    { id: 'e_p3', source: 'pro_company', content: "反对转基因的都是被环保圣母洗脑了！", tags: ['攻击'], bias: 'pro', extreme: true },
    { id: 'e_p4', source: 'emotion_2', content: "必须转发！关乎每个人健康！", tags: ['煽动'], bias: 'pro', extreme: true },
    { id: 'e_p5', source: 'pro_expert', content: "穷山恶水出刁民，越无知越反对！", tags: ['攻击'], bias: 'pro', extreme: true },
    { id: 'e_p6', source: 'emotion_3', content: "99%的人都不知道的转基因真相！", tags: ['标题党'], bias: 'pro', extreme: true },
    { id: 'e_p7', source: 'pro_academy', content: "方舟子：美国人不吃转基因是谣言！", tags: ['谣言'], bias: 'pro', extreme: true },
    { id: 'e_p8', source: 'emotion_1', content: "反转基因就是阻挡中国崛起！", tags: ['帽子'], bias: 'pro', extreme: true },
    { id: 'e_p9', source: 'pro_scientist', content: "有机食品都是交的'智商税'！", tags: ['攻击'], bias: 'pro', extreme: true },
    { id: 'e_p10', source: 'emotion_2', content: "权威发布：不转不是中国人！", tags: ['煽动'], bias: 'pro', extreme: true },
    
    // 极端反对方 (10条)
    { id: 'e_c1', source: 'con_activist', content: "转基因是美国的生物武器！亡国灭种！", tags: ['阴谋论'], bias: 'con', extreme: true },
    { id: 'e_c2', source: 'emotion_2', content: "紧急曝光！转基因背后的黑暗利益链！", tags: ['阴谋论'], bias: 'con', extreme: true },
    { id: 'e_c3', source: 'con_media', content: "吃了转基因三代之后全完蛋！", tags: ['恐慌'], bias: 'con', extreme: true },
    { id: 'e_c4', source: 'emotion_3', content: "央视主持人都说了转基因有问题！", tags: ['谣言'], bias: 'con', extreme: true },
    { id: 'e_c5', source: 'con_parent', content: "哪个家长愿意拿孩子当小白鼠？", tags: ['情感'], bias: 'con', extreme: true },
    { id: 'e_c6', source: 'emotion_4', content: "卖转基因食品的都是汉奸！", tags: ['攻击'], bias: 'con', extreme: true },
    { id: 'e_c7', source: 'con_activist', content: "支持转基因的都是被跨国公司收买了！", tags: ['阴谋论'], bias: 'con', extreme: true },
    { id: 'e_c8', source: 'emotion_1', content: "癌症爆发都是因为转基因！", tags: ['恐慌'], bias: 'con', extreme: true },
    { id: 'e_c9', source: 'con_expert', content: "这是定向投毒！比鸦片还毒！", tags: ['恐慌'], bias: 'con', extreme: true },
    { id: 'e_c10', source: 'emotion_4', content: "转发救同胞！让更多人知道真相！", tags: ['煽动'], bias: 'con', extreme: true },
  ],

  // 第一章：试探主题看法（转基因食品）
  chapter1Cards: [], // 使用proCards/conCards/neutralCards

  // 第三章：破壁时刻 - 身边亲身经历的认知颠覆事件
  chapter3Event: {
    title: "你亲身经历的那件事",
    description: "你一直以为转基因有问题，但最近你发现：一直吃的某品牌食用油居然是转基因的，吃了好几年一点事没有。或者你发现某个反转人士私下也在吃转基因食品...",
    
    // 必须看的多角度内容
    cards: [
      { id: 'c3_1', source: 'neutral_fact', content: "全球食用转基因食品超过20年，无一例确认安全问题", tags: ['事实'], bias: 'neutral' },
      { id: 'c3_2', source: 'pro_scientist', content: "你之前的认知可能来自单一信息源", tags: ['反思'], bias: 'pro' },
      { id: 'c3_3', source: 'con_activist', content: "但仍有人坚持认为长期风险未知", tags: ['质疑'], bias: 'con' },
      { id: 'c3_4', source: 'neutral_research', content: "这说明：亲身体验和媒体报道可能有落差", tags: ['思考'], bias: 'neutral' },
    ]
  },

  // 第四章：平衡之道 - 建议内容
  chapter4Tips: [
    { title: "主动破壁", desc: "关注几个理性的不同立场者", icon: "🌐" },
    { title: "信息溯源", desc: "追踪首发报道和多方信源", icon: "🔍" },
    { title: "事实核查", desc: "在激烈情绪前验证基本事实", icon: "⏸️" },
    { title: "共识区间", desc: "寻找对基本事实的共识", icon: "🤝" },
  ],

  // 章节元数据
  chapters: [
    {
      id: 1,
      title: "试探",
      subtitle: "你开始了解这个话题",
      narrative: "转基因食品引发了广泛争议。你对这个话题了解多少？通过选择来表达你的看法吧。"
    },
    {
      id: 2,
      title: "回音壁",
      subtitle: "你只能听到与自己相似的声音",
      narrative: "算法越来越了解你，推送的都是你想看的。但奇怪的是，另一种声音好像越来越少了..."
    },
    {
      id: 3,
      title: "破壁时刻",
      subtitle: "现实比想象的更复杂",
      narrative: "你亲身经历了一件事，推翻了之前的认知。你开始意识到：也许你一直以来的看法并不完整..."
    },
    {
      id: 4,
      title: "平衡之道",
      subtitle: "信息也需要营养均衡",
      narrative: "真正的智慧，不是非此即彼，而是理解复杂性。学会平衡你的信息食谱吧。"
    }
  ]
};
