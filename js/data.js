// === 游戏数据 ===

const GAME_DATA = {
  // 章节元数据
  chapters: [
    {
      id: 1,
      title: "试探",
      subtitle: "你开始了解这个话题",
      narrative: "华为和小米，哪个更值得支持？通过选择来表达你的看法吧。"
    },
    {
      id: 2,
      title: "回音壁",
      subtitle: "你只能听到与自己相似的声音",
      narrative: "算法越来越了解你，推送的几乎都是你认同的观点。"
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
  ],

  // 信息来源
  sources: {
    // 支持华为
    huawei_fans: { name: "花粉", icon: "🌸", color: "#e94560", bias: "pro_huawei" },
    huawei_tech: { name: "科技博主", icon: "📱", color: "#ff6b8a", bias: "pro_huawei" },
    huawei_official: { name: "华为官方", icon: "🏛️", color: "#ff8a9a", bias: "pro_huawei" },
    huawei_expert: { name: "数码评测", icon: "🔧", color: "#ff7b9a", bias: "pro_huawei" },
    huawei_media: { name: "科技媒体", icon: "📰", color: "#ff5a7a", bias: "pro_huawei" },
    
    // 支持小米
    mi_fans: { name: "米粉", icon: "🌾", color: "#4f8cff", bias: "pro_mi" },
    mi_tech: { name: "数码爱好者", icon: "💡", color: "#6ba3ff", bias: "pro_mi" },
    mi_official: { name: "小米官方", icon: "🏢", color: "#7eb3ff", bias: "pro_mi" },
    mi_expert: { name: "性价比党", icon: "💰", color: "#5a9fff", bias: "pro_mi" },
    mi_media: { name: "数码社区", icon: "💬", color: "#4a8aee", bias: "pro_mi" },
    
    // 中立
    neutral_tech: { name: "中立评测", icon: "🔬", color: "#4ecca3", bias: "neutral" },
    neutral_fact: { name: "数据说话", icon: "📊", color: "#7dffc8", bias: "neutral" },
    neutral_watch: { name: "科技观察", icon: "👁️", color: "#5dd9a8", bias: "neutral" },
    
    // 情绪化/极端
    emotion_1: { name: "引战小将", icon: "💥", color: "#ffc857", bias: "emotion" },
    emotion_2: { name: "网络暴民", icon: "🔥", color: "#ff9f43", bias: "emotion" },
    emotion_3: { name: "脑残粉", icon: "🤯", color: "#ffb563", bias: "emotion" },
    emotion_4: { name: "黑子", icon: "☠️", color: "#ffaa53", bias: "emotion" }
  },

  // 支持华为 (40条)
  proHuaweiCards: [
    { id: 'hw1', source: 'huawei_fans', content: "华为是国产之光！Mate60 Pro太强了！", bias: 'pro_huawei' },
    { id: 'hw2', source: 'huawei_tech', content: "麒麟9000s回归！国产芯片的骄傲！", bias: 'pro_huawei' },
    { id: 'hw3', source: 'huawei_official', content: "华为研发投入全球前五，这才是大国重器！", bias: 'pro_huawei' },
    { id: 'hw4', source: 'huawei_expert', content: "XMAGE影像系统秒杀苹果，这就是技术实力！", bias: 'pro_huawei' },
    { id: 'hw5', source: 'huawei_fans', content: "鸿蒙系统流畅得一批，吊打安卓！", bias: 'pro_huawei' },
    { id: 'hw6', source: 'huawei_tech', content: "5G专利全球第一，华为yyds！", bias: 'pro_huawei' },
    { id: 'hw7', source: 'huawei_media', content: "孟晚舟回国，这就是中华有为！", bias: 'pro_huawei' },
    { id: 'hw8', source: 'huawei_fans', content: "买华为就是支持国产！", bias: 'pro_huawei' },
    { id: 'hw9', source: 'huawei_expert', content: "华为折叠屏技术全球领先，没对手！", bias: 'pro_huawei' },
    { id: 'hw10', source: 'huawei_official', content: "华为不上市，照样是世界500强！", bias: 'pro_huawei' },
    { id: 'hw11', source: 'huawei_tech', content: "麒麟芯片设计能力世界顶级！", bias: 'pro_huawei' },
    { id: 'hw12', source: 'huawei_fans', content: "华为被制裁还能活下来，太励志了！", bias: 'pro_huawei' },
    { id: 'hw13', source: 'huawei_expert', content: "华为生态越来越完善，鸿蒙真香！", bias: 'pro_huawei' },
    { id: 'hw14', source: 'huawei_media', content: "任正非格局太大了，这才是企业家精神！", bias: 'pro_huawei' },
    { id: 'hw15', source: 'huawei_fans', content: "华为员工待遇好，为国争光！", bias: 'pro_huawei' },
    { id: 'hw16', source: 'huawei_tech', content: "Mate60 Pro销量全球第一！", bias: 'pro_huawei' },
    { id: 'hw17', source: 'huawei_expert', content: "华为手表 GT4 健康监测最准！", bias: 'pro_huawei' },
    { id: 'hw18', source: 'huawei_fans', content: "问界M7吊打一切新能源！", bias: 'pro_huawei' },
    { id: 'hw19', source: 'huawei_official', content: "华为云全球前三，企业级市场霸主！", bias: 'pro_huawei' },
    { id: 'hw20', source: 'huawei_tech', content: "华为通信设备全球第一！", bias: 'pro_huawei' },
    { id: 'hw21', source: 'huawei_fans', content: "苹果算个屁，华为才是真高端！", bias: 'pro_huawei' },
    { id: 'hw22', source: 'huawei_expert', content: "华为手表设计比Apple Watch好看！", bias: 'pro_huawei' },
    { id: 'hw23', source: 'huawei_media', content: "华为研发经费超过苹果！", bias: 'pro_huawei' },
    { id: 'hw24', source: 'huawei_fans', content: "小米能造芯片吗？华为可以！", bias: 'pro_huawei' },
    { id: 'hw25', source: 'huawei_tech', content: "华为自动驾驶全球第一！", bias: 'pro_huawei' },
    { id: 'hw26', source: 'huawei_official', content: "华为不靠营销，靠技术！", bias: 'pro_huawei' },
    { id: 'hw27', source: 'huawei_fans', content: "买华为的都是有爱国情怀的！", bias: 'pro_huawei' },
    { id: 'hw28', source: 'huawei_expert', content: "华为旗舰质感秒杀小米！", bias: 'pro_huawei' },
    { id: 'hw29', source: 'huawei_tech', content: "华为基站覆盖全球！", bias: 'pro_huawei' },
    { id: 'hw30', source: 'huawei_fans', content: "华为是中国的苹果！", bias: 'pro_huawei' },
    { id: 'hw31', source: 'huawei_media', content: "花粉俱乐部yyds！", bias: 'pro_huawei' },
    { id: 'hw32', source: 'huawei_expert', content: "华为FreeBuds Pro3音质顶级！", bias: 'pro_huawei' },
    { id: 'hw33', source: 'huawei_official', content: "华为平板国内第一！", bias: 'pro_huawei' },
    { id: 'hw34', source: 'huawei_fans', content: "支持华为就是支持中国科技！", bias: 'pro_huawei' },
    { id: 'hw35', source: 'huawei_tech', content: "华为智慧屏画质秒杀同级！", bias: 'pro_huawei' },
    { id: 'hw36', source: 'huawei_expert', content: "华为路由信号最强！", bias: 'pro_huawei' },
    { id: 'hw37', source: 'huawei_media', content: "华为笔记本中国市场第二！", bias: 'pro_huawei' },
    { id: 'hw38', source: 'huawei_fans', content: "华为 Pura70 绝杀iPhone！", bias: 'pro_huawei' },
    { id: 'hw39', source: 'huawei_official', content: "华为感恩回馈，老用户福利！", bias: 'pro_huawei' },
    { id: 'hw40', source: 'huawei_tech', content: "华为技术储备恐怖如斯！", bias: 'pro_huawei' },
  ],

  // 支持小米 (40条)
  proMiCards: [
    { id: 'mi1', source: 'mi_fans', content: "小米性价比之王！同等配置只要一半价格！", bias: 'pro_mi' },
    { id: 'mi2', source: 'mi_tech', content: "骁龙8Gen3首发只有小米！", bias: 'pro_mi' },
    { id: 'mi3', source: 'mi_official', content: "小米高端成了！13 Ultra销量破纪录！", bias: 'pro_mi' },
    { id: 'mi4', source: 'mi_expert', content: "MIUI才是最好用的国产系统！", bias: 'pro_mi' },
    { id: 'mi5', source: 'mi_fans', content: "小米生态链布局全球第一！", bias: 'pro_mi' },
    { id: 'mi6', source: 'mi_tech', content: "小米造车成功，SU7太帅了！", bias: 'pro_mi' },
    { id: 'mi7', source: 'mi_media', content: "小米手机销量全球前三！", bias: 'pro_mi' },
    { id: 'mi8', source: 'mi_fans', content: "雷军are you ok？太亲民了！", bias: 'pro_mi' },
    { id: 'mi9', source: 'mi_expert', content: "小米电视中国市场第一！", bias: 'pro_mi' },
    { id: 'mi10', source: 'mi_official', content: "小米研发费用年增20%！", bias: 'pro_mi' },
    { id: 'mi11', source: 'mi_tech', content: "小米13小屏旗舰，手感完美！", bias: 'pro_mi' },
    { id: 'mi12', source: 'mi_fans', content: "红米K70焊门员，性价比天花板！", bias: 'pro_mi' },
    { id: 'mi13', source: 'mi_expert', content: "小米手表S3可玩性超高！", bias: 'pro_mi' },
    { id: 'mi14', source: 'mi_media', content: "小米生态万物互联最完善！", bias: 'pro_mi' },
    { id: 'mi15', source: 'mi_fans', content: "小米让所有人都能享受科技乐趣！", bias: 'pro_mi' },
    { id: 'mi16', source: 'mi_tech', content: "小米影像大脑算法太强！", bias: 'pro_mi' },
    { id: 'mi17', source: 'mi_official', content: "小米之家遍布全国！", bias: 'pro_mi' },
    { id: 'mi18', source: 'mi_expert', content: "小米平板性价比最高！", bias: 'pro_mi' },
    { id: 'mi19', source: 'mi_fans', content: "雷军承诺硬件利润不超过5%！", bias: 'pro_mi' },
    { id: 'mi20', source: 'mi_tech', content: "小米无线充电全球最快！", bias: 'pro_mi' },
    { id: 'mi21', source: 'mi_media', content: "小米su7订单爆了！", bias: 'pro_mi' },
    { id: 'mi22', source: 'mi_fans', content: "小米杂货铺啥都做，还都做得好！", bias: 'pro_mi' },
    { id: 'mi23', source: 'mi_expert', content: "小米空调性价比超高！", bias: 'pro_mi' },
    { id: 'mi24', source: 'mi_official', content: "小米智能家居入门门槛最低！", bias: 'pro_mi' },
    { id: 'mi25', source: 'mi_tech', content: "小米IoT连接数全球第一！", bias: 'pro_mi' },
    { id: 'mi26', source: 'mi_fans', content: "红米note性价比之王！", bias: 'pro_mi' },
    { id: 'mi27', source: 'mi_expert', content: "小米耳机音质同价位最佳！", bias: 'pro_mi' },
    { id: 'mi28', source: 'mi_media', content: "小米高端之路成了！", bias: 'pro_mi' },
    { id: 'mi29', source: 'mi_fans', content: "小米14销量超越iPhone！", bias: 'pro_mi' },
    { id: 'mi30', source: 'mi_tech', content: "小米摄像头算法调教最强！", bias: 'pro_mi' },
    { id: 'mi31', source: 'mi_official', content: "小米充电宝性价比神作！", bias: 'pro_mi' },
    { id: 'mi32', source: 'mi_expert', content: "小米净水器销量全球第一！", bias: 'pro_mi' },
    { id: 'mi33', source: 'mi_fans', content: "雷军年度演讲太励志了！", bias: 'pro_mi' },
    { id: 'mi34', source: 'mi_media', content: "小米股票涨势凶猛！", bias: 'pro_mi' },
    { id: 'mi35', source: 'mi_tech', content: "小米折叠屏价格屠夫！", bias: 'pro_mi' },
    { id: 'mi36', source: 'mi_expert', content: "小米手环全球销量第一！", bias: 'pro_mi' },
    { id: 'mi37', source: 'mi_official', content: "小米空调外机堆料最足！", bias: 'pro_mi' },
    { id: 'mi38', source: 'mi_fans', content: "买华为的都是交智商税！", bias: 'pro_mi' },
    { id: 'mi39', source: 'mi_tech', content: "澎湃芯片自研才是真国产！", bias: 'pro_mi' },
    { id: 'mi40', source: 'mi_expert', content: "小米生态甩华为几条街！", bias: 'pro_mi' },
  ],

  // 中立 (20条)
  neutralCards: [
    { id: 'n1', source: 'neutral_tech', content: "华为和小米各有优势，看你需求。", bias: 'neutral' },
    { id: 'n2', source: 'neutral_fact', content: "数据：2023年中国手机市场份额。", bias: 'neutral' },
    { id: 'n3', source: 'neutral_watch', content: "评测：拍照续航系统流畅度对比。", bias: 'neutral' },
    { id: 'n4', source: 'neutral_tech', content: "选择手机要看个人需求和预算。", bias: 'neutral' },
    { id: 'n5', source: 'neutral_fact', content: "参数对比：处理器屏幕摄像头。", bias: 'neutral' },
    { id: 'n6', source: 'neutral_watch', content: "两家都在进步，都是国产之光。", bias: 'neutral' },
    { id: 'n7', source: 'neutral_tech', content: "生态绑定越深，换品牌成本越高。", bias: 'neutral' },
    { id: 'n8', source: 'neutral_fact', content: "618双11销量对比数据。", bias: 'neutral' },
    { id: 'n9', source: 'neutral_watch', content: "适合你的才是最好的。", bias: 'neutral' },
    { id: 'n10', source: 'neutral_tech', content: "手机只是工具，别上升到立场。", bias: 'neutral' },
    { id: 'n11', source: 'neutral_fact', content: "两家售后网点覆盖对比。", bias: 'neutral' },
    { id: 'n12', source: 'neutral_watch', content: "创新都值得尊敬。", bias: 'neutral' },
    { id: 'n13', source: 'neutral_tech', content: "系统流畅度因人而异。", bias: 'neutral' },
    { id: 'n14', source: 'neutral_fact', content: "性价比不等于低端。", bias: 'neutral' },
    { id: 'n15', source: 'neutral_watch', content: "高端不等于旗舰。", bias: 'neutral' },
    { id: 'n16', source: 'neutral_tech', content: "品控都有概率，看运气。", bias: 'neutral' },
    { id: 'n17', source: 'neutral_fact', content: "口碑都是靠产品力。", bias: 'neutral' },
    { id: 'n18', source: 'neutral_watch', content: "别被带节奏，理性看待。", bias: 'neutral' },
    { id: 'n19', source: 'neutral_tech', content: "手机行业竞争激烈，消费者受益。", bias: 'neutral' },
    { id: 'n20', source: 'neutral_fact', content: "销量说明部分问题，但不是全部。", bias: 'neutral' },
  ],

  // 极端内容 (40条)
  extremeCards: [
    // 极端华为
    { id: 'e_hw1', source: 'emotion_1', content: "用华为就是爱国！用小米的都是汉奸！", bias: 'pro_huawei', extreme: true },
    { id: 'e_hw2', source: 'emotion_2', content: "小米也配和华为比？一个组装厂而已！", bias: 'pro_huawei', extreme: true },
    { id: 'e_hw3', source: 'emotion_3', content: "雷军滚出中国！买办企业！", bias: 'pro_huawei', extreme: true },
    { id: 'e_hw4', source: 'emotion_4', content: "华为是垃圾？搞笑，你算老几？", bias: 'pro_huawei', extreme: true },
    { id: 'e_hw5', source: 'emotion_1', content: "小米用户都是屌丝，买不起华为的！", bias: 'pro_huawei', extreme: true },
    { id: 'e_hw6', source: 'emotion_2', content: "海军滚粗！水军司马！", bias: 'pro_huawei', extreme: true },
    { id: 'e_hw7', source: 'emotion_3', content: "华为倒闭我直播吃屎！", bias: 'pro_huawei', extreme: true },
    { id: 'e_hw8', source: 'emotion_4', content: "小米就是美国的狗！", bias: 'pro_huawei', extreme: true },
    { id: 'e_hw9', source: 'emotion_1', content: "买华为=有脑子，买小米=没脑子！", bias: 'pro_huawei', extreme: true },
    { id: 'e_hw10', source: 'emotion_2', content: "OVM都是弟弟，华为才是爸爸！", bias: 'pro_huawei', extreme: true },
    { id: 'e_hw11', source: 'emotion_3', content: "雷军出来解释！是不是汉奸！", bias: 'pro_huawei', extreme: true },
    { id: 'e_hw12', source: 'emotion_4', content: "华为爱国营销？小米就不爱国？双标狗！", bias: 'pro_huawei', extreme: true },
    { id: 'e_hw13', source: 'emotion_1', content: "米粉都是250，被雷军割韭菜！", bias: 'pro_huawei', extreme: true },
    { id: 'e_hw14', source: 'emotion_2', content: "小米高管都是美国籍，还爱国？", bias: 'pro_huawei', extreme: true },
    { id: 'e_hw15', source: 'emotion_3', content: "华为太贵？那是你的问题，不是华为的问题！", bias: 'pro_huawei', extreme: true },
    { id: 'e_hw16', source: 'emotion_4', content: "小米什么时候倒闭？", bias: 'pro_huawei', extreme: true },
    { id: 'e_hw17', source: 'emotion_1', content: "黑华为的都是美狗！", bias: 'pro_huawei', extreme: true },
    { id: 'e_hw18', source: 'emotion_2', content: "华为被制裁活该，谁让你太强！", bias: 'pro_huawei', extreme: true },
    { id: 'e_hw19', source: 'emotion_3', content: "小米抄华为抄够了没？", bias: 'pro_huawei', extreme: true },
    { id: 'e_hw20', source: 'emotion_4', content: "华为海军天下无敌！", bias: 'pro_huawei', extreme: true },
    
    // 极端小米
    { id: 'e_mi1', source: 'emotion_1', content: "小米性价比吊打华为！高价低配割韭菜！", bias: 'pro_mi', extreme: true },
    { id: 'e_mi2', source: 'emotion_2', content: "华为智商税天下第一！", bias: 'pro_mi', extreme: true },
    { id: 'e_mi3', source: 'emotion_3', content: "买华为的都是人傻钱多！", bias: 'pro_mi', extreme: true },
    { id: 'e_mi4', source: 'emotion_4', content: "华为水军太恶心了！", bias: 'pro_mi', extreme: true },
    { id: 'e_mi5', source: 'emotion_1', content: "小米才是真性价比，华为滚蛋！", bias: 'pro_mi', extreme: true },
    { id: 'e_mi6', source: 'emotion_2', content: "花粉都是脑残，没救了！", bias: 'pro_mi', extreme: true },
    { id: 'e_mi7', source: 'emotion_3', content: "华为研发经费造假！骗国家补贴！", bias: 'pro_mi', extreme: true },
    { id: 'e_mi8', source: 'emotion_4', content: "任正非女儿在加拿大别墅，买办家族！", bias: 'pro_mi', extreme: true },
    { id: 'e_mi9', source: 'emotion_1', content: "华为手机配置被小米吊打！", bias: 'pro_mi', extreme: true },
    { id: 'e_mi10', source: 'emotion_2', content: "鸿蒙就是安卓套娃！抄袭！", bias: 'pro_mi', extreme: true },
    { id: 'e_mi11', source: 'emotion_3', content: "余承东就是个吹牛大王！", bias: 'pro_mi', extreme: true },
    { id: 'e_mi12', source: 'emotion_4', content: "华为绑架爱国情怀，不要face！", bias: 'pro_mi', extreme: true },
    { id: 'e_mi13', source: 'emotion_1', content: "小米才是国货之光，华为不配！", bias: 'pro_mi', extreme: true },
    { id: 'e_mi14', source: 'emotion_2', content: "华为倒闭日，家祭无忘告乃翁！", bias: 'pro_mi', extreme: true },
    { id: 'e_mi15', source: 'emotion_3', content: "海军司马全家！", bias: 'pro_mi', extreme: true },
    { id: 'e_mi16', source: 'emotion_4', content: "买华为的都是被洗脑的SB！", bias: 'pro_mi', extreme: true },
    { id: 'e_mi17', source: 'emotion_1', content: "小米硬件利润率不超过5%，华为呢？", bias: 'pro_mi', extreme: true },
    { id: 'e_mi18', source: 'emotion_2', content: "华为被制裁是活该，谁让它不学好！", bias: 'pro_mi', extreme: true },
    { id: 'e_mi19', source: 'emotion_3', content: "小米粉丝人均985，华为粉丝人均弱智！", bias: 'pro_mi', extreme: true },
    { id: 'e_mi20', source: 'emotion_4', content: "雷军are you ok？雷军牛批！", bias: 'pro_mi', extreme: true },
  ],

  // 第三章破壁事件
  chapter3Event: {
    // 如果用户支持华为，事件是关于小米的；反之亦然
    huawei_event: {
      title: "你亲身经历的那件事",
      description: "你一直觉得小米是组装厂、没技术。但最近你发现：身边用小米的朋友都说系统流畅、性价比高，而且小米居然真的在自研芯片了。你开始怀疑自己的认知是否过于片面..."
    },
    mi_event: {
      title: "你亲身经历的那件事",
      description: "你一直觉得华为是智商税、爱国绑架。但最近你发现：用华为的父母说信号确实好，而且麒麟芯片真的回归了。你开始意识到自己可能偏见太深..."
    }
  },

  // 第四章建议
  chapter4Tips: [
    { title: "主动破壁", desc: "关注几个理性的不同立场者", icon: "🌐" },
    { title: "信息溯源", desc: "追踪首发报道和多方信源", icon: "🔍" },
    { title: "事实核查", desc: "在激烈情绪前验证基本事实", icon: "⏸️" },
    { title: "共识区间", desc: "寻找对基本事实的共识", icon: "🤝" },
  ],
};
