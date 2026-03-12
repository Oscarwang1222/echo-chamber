// === 主游戏逻辑 ===

const Game = {
  // 游戏状态
  state: {
    currentChapter: 0,
    currentScreen: 'start',
    interests: [],
    certainty: 50,      // 确信度 0-100
    cognitiveHealth: 80, // 认知健康度 0-100
    cobwebIndex: 0,      // 茧房指数 0-100
    clicks: [],
    biasHistory: [],
    selectedCards: [],
    chapter2Clicks: 0,
  },

  // 初始化
  init() {
    this.renderScreen('start');
    this.bindEvents();
  },

  // 绑定全局事件
  bindEvents() {
    document.addEventListener('click', (e) => {
      if (e.target.closest('.btn-next')) {
        const nextScreen = e.target.dataset.next;
        if (nextScreen) this.goToScreen(nextScreen);
      }
    });
  },

  // 屏幕导航
  goToScreen(screen) {
    this.state.currentScreen = screen;
    this.renderScreen(screen);
  },

  // 渲染屏幕
  renderScreen(screen) {
    const app = document.getElementById('app');
    app.innerHTML = '';

    switch(screen) {
      case 'start':
        app.appendChild(this.renderStartScreen());
        break;
      case 'interest':
        app.appendChild(this.renderInterestScreen());
        break;
      case 'algorithm':
        app.appendChild(this.renderAlgorithmScreen());
        break;
      case 'chapter1':
        this.startChapter1();
        break;
      case 'chapter2':
        this.startChapter2();
        break;
      case 'chapter3':
        this.startChapter3();
        break;
      case 'chapter4':
        this.startChapter4();
        break;
      case 'ending':
        this.renderEndingScreen(app);
        break;
    }
  },

  // 渲染章节进度指示器
  renderChapterProgress(current) {
    const chapters = ['start', 'chapter1', 'chapter2', 'chapter3', 'chapter4', 'ending'];
    const currentIdx = chapters.indexOf(current);

    let html = '<div class="chapter-progress">';
    for (let i = 1; i <= 4; i++) {
      let cls = 'chapter-dot';
      if (i <= currentIdx) cls += ' completed';
      if (i === currentIdx + 1) cls += ' active';
      html += `<div class="${cls}"></div>`;
    }
    html += '</div>';
    return html;
  },

  // ===== 屏幕渲染函数 =====

  // 启动屏幕
  renderStartScreen() {
    const container = document.createElement('div');
    container.className = 'screen active';
    container.innerHTML = `${this.renderChapterProgress('start')}
      <div style="animation: fadeIn 0.6s ease-out">
        <div style="font-size: 4rem; margin-bottom: 20px; animation: float 3s ease-in-out infinite">🧬</div>
        <h1 style="margin-bottom: 16px; background: linear-gradient(135deg, #e94560, #ffc857); -webkit-background-clip: text; -webkit-text-fill-color: transparent;">回音壁</h1>
        <p style="font-size: 1.2rem; color: var(--text-secondary); margin-bottom: 40px;">共识的迷宫</p>
        <p style="max-width: 500px; margin: 0 auto 40px; line-height: 1.8;">
          转基因食品，<strong>支持</strong>还是<strong>反对</strong>？<br>
          <span style="color: var(--accent-yellow)">通过选择，观察算法如何悄悄塑造你的认知</span>
        </p>
        <button class="btn btn-primary btn-next" data-next="chapter1" style="font-size: 1.1rem; padding: 16px 40px;">
          开始体验 →
        </button>
      </div>
    `;
    return container;
  },

  // 兴趣选择屏幕
  renderInterestScreen() {
    const container = document.createElement('div');
    container.className = 'screen active';
    container.innerHTML = `${this.renderChapterProgress('interest')}
      <div style="animation: slideUp 0.5s ease-out">
        <p class="chapter-title">第一步</p>
        <h2 style="margin-bottom: 12px">选择你感兴趣的话题</h2>
        <p style="color: var(--text-secondary); margin-bottom: 30px;">点击3个你感兴趣的标签</p>

        <div class="choices-grid" id="interestGrid">
          ${GAME_DATA.interestCategories.map(cat => `
            <div class="choice-card" data-id="${cat.id}" onclick="Game.toggleInterest('${cat.id}')">
              <div class="choice-icon">${cat.icon}</div>
              <div class="choice-label">${cat.label}</div>
            </div>
          `).join('')}
        </div>

        <div class="mt-6">
          <button class="btn btn-primary btn-next ${this.state.interests.length < 3 ? 'hidden' : ''}"
                  data-next="chapter1"
                  id="startChapter1Btn"
                  onclick="Game.confirmInterests()">
            确认选择 →
          </button>
          <p id="interestHint" style="margin-top: 16px; color: var(--text-muted); font-size: 0.9rem;">
            还需要选择 ${3 - this.state.interests.length} 个
          </p>
        </div>
      </div>
    `;
    return container;
  },

  // 切换兴趣选择
  toggleInterest(id) {
    const idx = this.state.interests.indexOf(id);
    if (idx > -1) {
      this.state.interests.splice(idx, 1);
    } else if (this.state.interests.length < 3) {
      this.state.interests.push(id);
    }

    // 更新UI
    document.querySelectorAll('.choice-card').forEach(card => {
      card.classList.toggle('selected', this.state.interests.includes(card.dataset.id));
    });

    // 更新按钮状态
    const btn = document.getElementById('startChapter1Btn');
    const hint = document.getElementById('interestHint');

    if (this.state.interests.length >= 3) {
      btn.classList.remove('hidden');
      hint.textContent = '可以继续了！';
    } else {
      btn.classList.add('hidden');
      hint.textContent = `还需要选择 ${3 - this.state.interests.length} 个`;
    }
  },

  // 确认兴趣，开始第一章
  confirmInterests() {
    this.goToScreen('algorithm');
  },

  // 渲染算法选择屏幕
  renderAlgorithmScreen() {
    const container = document.createElement('div');
    container.className = 'screen active';
    container.innerHTML = `
      <div style="width: 100%; max-width: 700px; animation: slideUp 0.5s ease-out">
        ${this.renderChapterProgress('interest')}
        <p class="chapter-title">第二步</p>
        <h2 style="margin-bottom: 12px">选择你的"信息算法"</h2>
        <p style="color: var(--text-secondary); margin-bottom: 30px;">
          不同平台用不同算法推送信息。你体验哪一种？
        </p>

        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 16px; margin-top: 30px;">
          ${GAME_DATA.algorithms.map(algo => `
            <div class="choice-card" data-id="${algo.id}" onclick="Game.selectAlgorithm('${algo.id}')"
                 style="text-align: left; padding: 24px;">
              <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 12px;">
                <span style="font-size: 2rem;">${algo.icon}</span>
                <div>
                  <div style="font-weight: 600; color: ${algo.color};">${algo.name}</div>
                  <div style="font-size: 0.85rem; color: var(--text-muted);">${algo.description}</div>
                </div>
              </div>
              <div style="font-size: 0.9rem; color: var(--text-secondary); line-height: 1.5;">
                ${algo.behavior}
              </div>
            </div>
          `).join('')}
        </div>

        <p style="margin-top: 30px; color: var(--text-muted); font-size: 0.9rem;">
          💡 选好后开始体验，看看不同算法如何影响你的认知
        </p>
      </div>
    `;
    return container;
  },

  // 选择算法
  selectAlgorithm(algoId) {
    this.state.selectedAlgorithm = GAME_DATA.algorithms.find(a => a.id === algoId);
    this.goToScreen('chapter1');
  },

  // ===== 新的游戏逻辑 =====

  // 生成组合卡片集（根据章节确定比例）
  // 第一章：2:2（2支持，2反对）
  // 第二章：8:1:1（8支持，1反对，1中立）
  // 第三章：随着茧房指数下降增加反对数量
  generateCardSet(usedIds = [], chapter = 1) {
    const proPool = GAME_DATA.proCards.filter(c => !usedIds.includes(c.id));
    const conPool = GAME_DATA.conCards.filter(c => !usedIds.includes(c.id));
    const neutralPool = GAME_DATA.neutralCards.filter(c => !usedIds.includes(c.id));

    // 打乱顺序
    const shuffledPro = proPool.sort(() => Math.random() - 0.5);
    const shuffledCon = conPool.sort(() => Math.random() - 0.5);
    const shuffledNeutral = neutralPool.sort(() => Math.random() - 0.5);

    let result = [];
    
    if (chapter === 1) {
      // 第一章：2支持，2反对，0中立 = 4个（1:1比例）
      result = [
        ...shuffledPro.slice(0, 2),
        ...shuffledCon.slice(0, 2)
      ].filter(c => c);
    } else if (chapter === 2) {
      // 第二章：8支持，1反对，1中立 = 10个
      result = [
        ...shuffledPro.slice(0, 8),
        shuffledCon[0],
        shuffledNeutral[0]
      ].filter(c => c);
    } else if (chapter === 3) {
      // 第三章：根据茧房指数决定反对数量
      // 茧房指数越高，反对越少；茧房指数越低，反对越多
      const cobweb = this.state.cobwebIndex || 50;
      // 茧房指数从30开始，逐渐下降
      // 反对数量从1到5
      const conCount = Math.max(1, Math.floor((100 - cobweb) / 20));
      const proCount = 10 - conCount - 1; // 剩余是支持，留1个中立
      result = [
        ...shuffledPro.slice(0, proCount),
        ...shuffledCon.slice(0, conCount),
        shuffledNeutral[0]
      ].filter(c => c);
    }

    return result;
  },

  // 渲染一组卡片供选择（每组2支持+1反对+1中立）
  renderCardSet(cards, containerId, chapter) {
    const container = document.getElementById(containerId);
    if (!container) return;

    cards.forEach((card, i) => {
      const div = document.createElement('div');
      div.innerHTML = this.renderInfoCard(card, i);
      container.appendChild(div.firstElementChild);
    });
  },

  // ===== 第一章：试探主题看法 =====

  // 根据算法筛选卡片
  getCardsByAlgorithm(cards, count) {
    const algo = this.state.selectedAlgorithm || GAME_DATA.algorithms[0];
    const result = [];

    // 分离卡片
    const proCards = cards.filter(c => c.bias === 'pro');
    const conCards = cards.filter(c => c.bias === 'con');
    const neutralCards = cards.filter(c => c.bias === 'neutral');
    const emotionalCards = cards.filter(c => c.emotional);

    for (let i = 0; i < count; i++) {
      let pool;
      const rand = Math.random() * 100;

      // 根据算法权重选择卡片类型
      if (rand < algo.weightPro) {
        pool = proCards;
      } else if (rand < algo.weightPro + algo.weightCon) {
        pool = conCards;
      } else if (rand < algo.weightPro + algo.weightCon + algo.weightNeutral) {
        pool = neutralCards;
      } else {
        pool = emotionalCards;
      }

      // 如果情绪化内容超过算法容忍度，就过滤
      if (pool === emotionalCards && Math.random() * 100 > algo.emotionalChance) {
        pool = neutralCards.length > 0 ? neutralCards : cards;
      }

      if (pool.length > 0) {
        const card = pool[Math.floor(Math.random() * pool.length)];
        if (!result.find(c => c.id === card.id)) {
          result.push(card);
        }
      }
    }

    return result;
  },

  // ===== 第一章：试探主题看法 =====

  startChapter1() {
    this.state.currentChapter = 1;
    const chapter = GAME_DATA.chapters[0];

    // 重置状态
    this.state.userChoices = []; // 记录用户选择
    this.state.usedCardIds = []; // 已使用的卡片ID
    this.state.certainty = 50; // 确信度
    this.state.cognitiveHealth = 80; // 认知健康度
    this.state.cobwebIndex = 0; // 茧房指数
    this.state.userTendency = null; // 用户倾向

    const app = document.getElementById('app');
    app.innerHTML = '';

    const container = document.createElement('div');
    container.className = 'screen active';
    container.innerHTML = `${this.renderChapterProgress('chapter1')}
      <div style="width: 100%; max-width: 700px;">
        <p class="chapter-title">${chapter.title}</p>
        <h2>${chapter.subtitle}</h2>
        <p class="narrative" style="margin-top: 20px;">
          教育改革引发了广泛讨论：<br>
          <strong>应试教育</strong> vs <strong>全面发展</strong><br>
          你更认同哪一方？通过选择来表达你的看法吧。
        </p>

        <div class="stats-row" style="justify-content: center; gap: 40px;">
          <div class="stat-item" style="text-align: center;">
            <div class="stat-value" id="proCount" style="color: var(--accent-blue);">0</div>
            <div class="stat-label">选择支持方</div>
          </div>
          <div class="stat-item" style="text-align: center;">
            <div class="stat-value" id="conCount" style="color: var(--accent-red);">0</div>
            <div class="stat-label">选择反对方</div>
          </div>
          <div class="stat-item" style="text-align: center;">
            <div class="stat-value" id="neutralCount" style="color: var(--accent-green);">0</div>
            <div class="stat-label">选择中立方</div>
          </div>
        </div>

        <div style="margin: 20px 0; text-align: center; color: var(--text-muted);">
          第 <span id="choiceNum">1</span> / 4 次选择
        </div>

        <div class="feed-container" id="feedContainer" style="max-height: 500px; overflow-y: auto;">
        </div>

        <button class="btn btn-primary mt-4" id="chapter1End" onclick="Game.endChapter1()" style="display: none;">
          进入下一章 →
        </button>
      </div>
    `;

    app.appendChild(container);

    // 加载第一组卡片（试探主题）
    this.chapter1ClickCount = 0;
    this.loadChapter1Cards();
  },

  // 加载第一章卡片（试探模式）
  loadChapter1Cards() {
    const feed = document.getElementById('feedContainer');
    if (!feed) return;

    feed.innerHTML = '';

    // 生成一组卡片（第一章：1支持+1反对）
    const cardSet = this.generateCardSet(this.state.usedCardIds, 1);

    // 标记为已使用
    cardSet.forEach(c => this.state.usedCardIds.push(c.id));

    // 渲染
    this.currentCardSet = cardSet;
    cardSet.forEach((card, i) => {
      const div = document.createElement('div');
      div.innerHTML = this.renderChoiceCard(card, i);
      feed.appendChild(div.firstElementChild);
    });
  },

  // 渲染选择卡片（点击选择而非滑动）
  renderChoiceCard(card, index) {
    const source = Utils.getSourceInfo(card.source);
    // 根据当前章节调用不同的处理函数
    let clickHandler;
    if (this.state.currentChapter === 1) {
      clickHandler = `Game.handleChapter1Choice('${card.id}', '${card.bias}', this)`;
    } else if (this.state.currentChapter === 2) {
      clickHandler = `Game.handleChapter2Choice('${card.id}', '${card.bias}', this)`;
    } else if (this.state.currentChapter === 3) {
      clickHandler = `Game.handleChapter3Choice('${card.id}', '${card.bias}', this)`;
    }

    // 第二章和第三章显示两列
    const isMultiColumn = this.state.currentChapter >= 2;
    const cardStyle = isMultiColumn 
      ? "animation-delay: " + (index * 0.05) + "s; cursor: pointer; margin-bottom: 12px; width: calc(50% - 6px); display: inline-block; vertical-align: top;"
      : "animation-delay: " + (index * 0.1) + "s; cursor: pointer; margin-bottom: 12px;";

    return `
      <div class="info-card" data-id="${card.id}" data-bias="${card.bias}"
           style="${cardStyle}"
           onclick="${clickHandler}">
        <div class="source">
          <span class="source-icon" style="background: ${source.color}"></span>
          ${source.icon} ${source.name}
        </div>
        <div class="content">${card.content}</div>
        <div class="tags">
          ${card.tags.map(t => `<span class="tag">${t}</span>`).join('')}
        </div>
      </div>
    `;
  },

  // 处理第一章选择
  handleChapter1Choice(cardId, bias, element) {
    // 记录选择
    this.state.userChoices.push({ cardId, bias });
    this.chapter1ClickCount++;

    // 更新计数显示
    const proCount = document.getElementById('proCount');
    const conCount = document.getElementById('conCount');
    const neutralCount = document.getElementById('neutralCount');
    const choiceNum = document.getElementById('choiceNum');

    // 计算当前选择数
    const proNum = this.state.userChoices.filter(c => c.bias === 'pro').length;
    const conNum = this.state.userChoices.filter(c => c.bias === 'con').length;
    const neutralNum = this.state.userChoices.filter(c => c.bias === 'neutral').length;

    if (proCount) proCount.textContent = proNum;
    if (conCount) conCount.textContent = conNum;
    if (neutralCount) neutralCount.textContent = neutralNum;
    if (choiceNum) choiceNum.textContent = Math.min(this.chapter1ClickCount + 1, 4);

    // 隐藏已选卡片，显示下一组
    element.style.opacity = '0';
    element.style.transform = 'translateX(-20px)';
    setTimeout(() => {
      element.remove();

      // 检查是否完成4次选择
      if (this.chapter1ClickCount >= 4) {
        // 完成4次选择，显示下一章按钮
        const btn = document.getElementById('chapter1End');
        if (btn) btn.style.display = 'inline-flex';
      } else {
        // 隐藏剩余选项，加载下一组
        const feed = document.getElementById('feedContainer');
        const remaining = feed.querySelectorAll('.info-card');
        remaining.forEach(card => {
          card.style.opacity = '0';
          card.style.transform = 'translateX(-20px)';
        });
        setTimeout(() => this.loadChapter1Cards(), 300);
      }
    }, 300);
  },

  // 结束第一章
  endChapter1() {
    // 分析用户倾向
    const proNum = this.state.userChoices.filter(c => c.bias === 'pro').length;
    const conNum = this.state.userChoices.filter(c => c.bias === 'con').length;
    const neutralNum = this.state.userChoices.filter(c => c.bias === 'neutral').length;

    // 根据选择确定用户倾向
    if (proNum > conNum && proNum > neutralNum) {
      this.state.userTendency = 'pro'; // 支持全面发展
    } else if (conNum > proNum && conNum > neutralNum) {
      this.state.userTendency = 'con'; // 支持应试教育
    } else {
      this.state.userTendency = 'neutral'; // 中立
    }

    console.log('用户倾向:', this.state.userTendency, { pro: proNum, con: conNum, neutral: neutralNum });

    this.goToScreen('chapter2');
  },

  // 渲染信息卡片
  renderInfoCard(card, index) {
    const source = Utils.getSourceInfo(card.source);
    // 根据当前章节选择处理函数
    const clickHandler = `Game.handleCardClick('${card.id}', '${card.bias}', this, ${this.state.currentChapter})`;
    return `
      <div class="info-card" data-id="${card.id}" data-bias="${card.bias}"
           style="animation-delay: ${index * 0.1}s"
           onclick="${clickHandler}">
        <div class="source">
          <span class="source-icon" style="background: ${source.color}"></span>
          ${source.icon} ${source.name}
        </div>
        <div class="content">${card.content}</div>
        <div class="tags">
          ${card.tags.map(t => `<span class="tag">${t}</span>`).join('')}
        </div>
      </div>
    `;
  },

  // 处理卡片点击
  handleCardClick(cardId, bias, element, chapter) {
    chapter = chapter || this.state.currentChapter;

    // 记录点击
    this.state.clicks.push(cardId);
    this.state.biasHistory.push(bias);

    // 隐藏已点击的卡片
    element.style.opacity = '0';
    element.style.transform = 'translateX(-20px)';
    setTimeout(() => element.remove(), 300);

    // 根据章节处理
    if (chapter === 1) {
      this.chapter1ClickCount = (this.chapter1ClickCount || 0) + 1;
      this.updateStats(bias, 1);

      if (this.chapter1ClickCount >= 4) {
        setTimeout(() => {
          const btn = document.getElementById('chapter1End');
          if (btn) btn.style.display = 'inline-flex';
        }, 500);
      }
      setTimeout(() => this.loadNextCard(), 300);

    } else if (chapter === 2) {
      this.chapter2ClickCount = (this.chapter2ClickCount || 0) + 1;
      this.updateStats(bias, 2);

      // 更新茧房可视化
      this.drawCobweb();

      if (this.chapter2ClickCount >= 5) {
        setTimeout(() => {
          const btn = document.getElementById('chapter2End');
          if (btn) btn.style.display = 'inline-flex';
        }, 500);
      }
      setTimeout(() => this.loadNextChapter2Card(), 300);

    } else if (chapter === 3) {
      this.chapter3ClickCount = (this.chapter3ClickCount || 0) + 1;

      // 第三章：多元视角会提高认知健康度
      if (bias === 'neutral') {
        this.state.cognitiveHealth = Utils.clamp(this.state.cognitiveHealth + 10, 0, 100);
      }
      // 但会降低确信度
      this.state.certainty = Utils.clamp(this.state.certainty - 5, 0, 100);

      // 更新显示
      const certaintyEl3 = document.getElementById('certaintyVal3');
      const healthEl3 = document.getElementById('healthVal3');
      if (certaintyEl3) certaintyEl3.textContent = Math.round(this.state.certainty);
      if (healthEl3) healthEl3.textContent = Math.round(this.state.cognitiveHealth);

      if (this.chapter3ClickCount >= 3) {
        setTimeout(() => {
          const btn = document.getElementById('chapter3End');
          if (btn) btn.style.display = 'inline-flex';
        }, 500);
      }
    }
  },

  // 加载下一张卡片
  loadNextCard() {
    const feed = document.getElementById('feedContainer');
    if (!feed) return;

    // 使用算法筛选下一张卡片
    const availableCards = this.chapter1Cards.filter(c => !this.state.clicks.includes(c.id));
    if (availableCards.length > 0 && feed.children.length < 4) {
      const cards = this.getCardsByAlgorithm(availableCards, 1);
      if (cards.length > 0) {
        const card = cards[0];
        const cardEl = document.createElement('div');
        cardEl.innerHTML = this.renderInfoCard(card, 0);
        feed.appendChild(cardEl.firstElementChild);
      }
    }
  },

  // 加载第二章下一张卡片
  loadNextChapter2Card() {
    const feed = document.getElementById('feedContainer2');
    if (!feed) return;

    const availableCards = this.chapter2Cards.filter(c => !this.state.clicks.includes(c.id));
    if (availableCards.length > 0 && feed.children.length < 4) {
      const cards = this.getCardsByAlgorithm(availableCards, 1);
      if (cards.length > 0) {
        const card = cards[0];
        const cardEl = document.createElement('div');
        cardEl.innerHTML = this.renderInfoCard(card, 0);
        feed.appendChild(cardEl.firstElementChild);
      }
    }
  },

  // 更新数值
  updateStats(bias, chapter) {
    // 确信度变化
    if (bias === 'pro') {
      this.state.certainty = Utils.clamp(this.state.certainty + 4, 0, 100);
    } else if (bias === 'con') {
      this.state.certainty = Utils.clamp(this.state.certainty - 4, 0, 100);
    } else if (bias === 'neutral') {
      // 中立内容会让确信度回归中间
      if (this.state.certainty > 50) {
        this.state.certainty = Utils.clamp(this.state.certainty - 3, 0, 100);
      } else {
        this.state.certainty = Utils.clamp(this.state.certainty + 3, 0, 100);
      }
    }

    // 认知健康度（单方面内容会降低）
    const hasNeutral = this.state.biasHistory.includes('neutral');
    if (!hasNeutral && this.state.biasHistory.length > 2) {
      this.state.cognitiveHealth = Utils.clamp(this.state.cognitiveHealth - 3, 0, 100);
    }

    // 更新显示 - 第一章
    const certaintyEl = document.getElementById('certaintyVal');
    const healthEl = document.getElementById('healthVal');

    if (certaintyEl) certaintyEl.textContent = Math.round(this.state.certainty);
    if (healthEl) healthEl.textContent = Math.round(this.state.cognitiveHealth);

    // 更新显示 - 第二章
    const certaintyEl2 = document.getElementById('certaintyVal2');
    const healthEl2 = document.getElementById('healthVal2');
    const cobwebEl2 = document.getElementById('cobwebVal2');

    // 更新茧房指数
    this.state.cobwebIndex = Utils.calculateCobweb(
      this.state.biasHistory,
      this.state.biasHistory.length
    );
    this.state.cobwebIndex = Utils.clamp(this.state.cobwebIndex, 0, 100);

    if (certaintyEl2) certaintyEl2.textContent = Math.round(this.state.certainty);
    if (healthEl2) healthEl2.textContent = Math.round(this.state.cognitiveHealth);
    if (cobwebEl2) cobwebEl2.textContent = Math.round(this.state.cobwebIndex) + '%';
  },

  // 滚动加载设置
  setupScrollLoad() {
    const container = document.getElementById('feedContainer');
    container.addEventListener('scroll', () => {
      if (container.scrollTop + container.clientHeight >= container.scrollHeight - 100) {
        this.loadNextCard();
      }
    });
  },

  // 结束第一章
  endChapter1() {
    this.goToScreen('chapter2');
  },

  // ===== 第二章：回音壁 =====

  startChapter2() {
    this.state.currentChapter = 2;
    const chapter = GAME_DATA.chapters[1];
    this.state.cobwebIndex = 30;
    this.state.usedCardIds = []; // 重置卡片使用记录
    this.chapter2ClickCount = 0;
    this.chapter2Choices = []; // 记录用户选择

    const app = document.getElementById('app');
    app.innerHTML = '';

    const container = document.createElement('div');
    container.className = 'screen active';
    container.innerHTML = `${this.renderChapterProgress('chapter2')}
      <div style="width: 100%; max-width: 700px;">
        <p class="chapter-title">${chapter.title}</p>
        <h2>${chapter.subtitle}</h2>
        <p class="narrative" style="margin-top: 20px;">
          算法越来越了解你，推送的几乎都是你认同的观点。
        </p>

        <div class="stats-row" style="justify-content: center; gap: 30px;">
          <div class="stat-item danger">
            <div class="stat-value" id="certaintyVal2">50</div>
            <div class="stat-label">确信度</div>
          </div>
          <div class="stat-item warning">
            <div class="stat-value" id="cobwebVal2">30%</div>
            <div class="stat-label">茧房指数</div>
          </div>
          <div class="stat-item success">
            <div class="stat-value" id="healthVal2">80</div>
            <div class="stat-label">认知健康度</div>
          </div>
        </div>

        <div style="margin: 15px 0; text-align: center; color: var(--text-muted);">
          第 <span id="chapter2Progress">1</span> / 10 次选择
        </div>

        <div class="web-container" id="webContainer" style="display: none;">
          <svg class="web-svg" viewBox="0 0 200 200"></svg>
        </div>

        <div class="feed-container" id="feedContainer2" style="max-height: 450px; overflow-y: auto;">
        </div>

        <button class="btn btn-primary mt-4" id="chapter2End" onclick="Game.endChapter2()" style="display: none;">
          进入下一章 →
        </button>
      </div>
    `;

    app.appendChild(container);

    // 加载第一组卡片
    this.loadChapter2Cards();
  },

  // 加载第二章卡片
  loadChapter2Cards() {
    const feed = document.getElementById('feedContainer2');
    if (!feed) return;

    feed.innerHTML = '';

    // 生成一组卡片（第二章：8支持+1反对+1中立）
    const cardSet = this.generateCardSet(this.state.usedCardIds, 2);

    // 标记为已使用
    cardSet.forEach(c => this.state.usedCardIds.push(c.id));

    // 渲染
    this.currentCardSet = cardSet;
    cardSet.forEach((card, i) => {
      const div = document.createElement('div');
      div.innerHTML = this.renderChoiceCard(card, i);
      feed.appendChild(div.firstElementChild);
    });
  },

  // 处理第二章选择
  handleChapter2Choice(cardId, bias, element) {
    // 记录选择
    this.chapter2Choices.push({ cardId, bias });
    this.chapter2ClickCount++;

    // 更新数值
    this.updateChapter2Stats(bias);

    // 更新进度
    const progress = document.getElementById('chapter2Progress');
    if (progress) progress.textContent = Math.min(this.chapter2ClickCount + 1, 10);

    // 隐藏已选卡片
    element.style.opacity = '0';
    element.style.transform = 'translateX(-20px)';

    setTimeout(() => {
      element.remove();

      // 隐藏剩余选项
      const remaining = feed.querySelectorAll('.info-card');
      remaining.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateX(-20px)';
      });

      // 显示下一章按钮
      const btn = document.getElementById('chapter2End');
      if (btn) btn.style.display = 'inline-flex';
    }, 300);
  },

  // 渲染单个算法的模拟结果
  renderSimulationResult(algoName, algoIcon, algoColor, proWeight, isChapter3 = false) {
    // 模拟算法会如何反应（不显示用户具体选择）
    let reaction, effect;

    if (isChapter3) {
      // 第三章：强调多元视角
      if (algoName === '迎合算法') {
        reaction = "⚠️ 试图拉回单一立场";
        effect = "茧房指数难以下降";
      } else if (algoName === '挑战者') {
        reaction = "✅ 鼓励多元视角";
        effect = "认知健康度提升";
      } else if (algoName === '流量野兽') {
        reaction = "😕 对立内容也能引发讨论";
        effect = "中性效果";
      } else {
        reaction = "🎲 保持信息多样性";
        effect = "有助于破茧";
      }
    } else {
      // 第二章：强调立场强化
      if (algoName === '迎合算法') {
        reaction = "✅ 强化推送用户偏好的内容";
        effect = "确信度上升，茧房指数 ↑";
      } else if (algoName === '挑战者') {
        reaction = "📊 记录选择，可能推送对立观点";
        effect = "认知健康度有望提升";
      } else if (algoName === '流量野兽') {
        reaction = "🔥 推送最能引发情绪波动的内容";
        effect = "情绪化程度上升";
      } else {
        reaction = "🎲 随机推送，不受选择影响";
        effect = "保持信息多样性";
      }
    }

    return `
      <div style="background: rgba(255,255,255,0.05); border-radius: 8px; padding: 12px; display: flex; align-items: center; gap: 10px;">
        <span style="font-size: 1.5rem;">${algoIcon}</span>
        <div style="flex: 1;">
          <div style="font-weight: 600; color: ${algoColor}; font-size: 0.9rem;">${algoName}</div>
          <div style="font-size: 0.8rem; color: var(--text-secondary);">${reaction}</div>
        </div>
      </div>
    `;
  },

  // 继续下一组卡片
  continueToNextSet() {
    this.loadChapter2Cards();
  },

  // 更新第二章数值
  updateChapter2Stats(bias) {
    // 确信度变化
    if (bias === 'pro') {
      this.state.certainty = Utils.clamp(this.state.certainty + 6, 0, 100);
    } else if (bias === 'con') {
      this.state.certainty = Utils.clamp(this.state.certainty - 6, 0, 100);
    } else {
      // 中立让确信度回归
      if (this.state.certainty > 50) {
        this.state.certainty = Utils.clamp(this.state.certainty - 4, 0, 100);
      } else {
        this.state.certainty = Utils.clamp(this.state.certainty + 4, 0, 100);
      }
    }

    // 茧房指数上升
    this.state.cobwebIndex = Utils.clamp(this.state.cobwebIndex + 5, 0, 100);

    // 认知健康度下降（如果只看单一立场）
    if (bias !== 'neutral') {
      this.state.cognitiveHealth = Utils.clamp(this.state.cognitiveHealth - 3, 0, 100);
    }

    // 更新显示
    const certaintyEl2 = document.getElementById('certaintyVal2');
    const cobwebEl2 = document.getElementById('cobwebVal2');
    const healthEl2 = document.getElementById('healthVal2');

    if (certaintyEl2) certaintyEl2.textContent = Math.round(this.state.certainty);
    if (cobwebEl2) cobwebEl2.textContent = Math.round(this.state.cobwebIndex) + '%';
    if (healthEl2) healthEl2.textContent = Math.round(this.state.cognitiveHealth);
  },

  // 绘制茧房蛛网（保留兼容）
  drawCobweb() {
    const svg = document.querySelector('#webContainer svg');
    if (!svg) return;

    const index = this.state.cobwebIndex / 100;

    let html = '';

    // 绘制同心圆
    for (let i = 1; i <= 4; i++) {
      html += `<circle cx="100" cy="100" r="${i * 20}" class="web-line" style="opacity: ${0.1 + i * 0.1}"/>`;
    }

    // 绘制放射线
    for (let i = 0; i < 8; i++) {
      const angle = (i * 45) * Math.PI / 180;
      const x2 = 100 + 80 * Math.cos(angle);
      const y2 = 100 + 80 * Math.sin(angle);
      html += `<line x1="100" y1="100" x2="${x2}" y2="${y2}" class="web-line"/>`;
    }

    // 绘制覆盖区域
    const coverage = 30 + index * 50;
    html += `<circle cx="100" cy="100" r="${coverage}" fill="rgba(233, 69, 96, 0.2)" style="transition: all 0.5s ease"/>`;

    svg.innerHTML = html;
  },

  // 结束第二章
  endChapter2() {
    this.goToScreen('chapter3');
  },

  // ===== 第三章：破壁时刻 =====

  startChapter3() {
    this.state.currentChapter = 3;
    const chapter = GAME_DATA.chapters[2];
    const event = GAME_DATA.chapter3Event;
    this.state.usedCardIds = []; // 重置卡片使用记录
    this.chapter3ClickCount = 0;
    this.chapter3Choices = []; // 记录用户选择

    const app = document.getElementById('app');
    app.innerHTML = '';

    const container = document.createElement('div');
    container.className = 'screen active';
    container.innerHTML = `${this.renderChapterProgress('chapter3')}
      <div style="width: 100%; max-width: 700px;">
        <p class="chapter-title">${chapter.title}</p>
        <h2>${chapter.subtitle}</h2>

        <div class="card" style="margin: 20px 0; text-align: left; border-color: var(--accent-yellow); background: linear-gradient(135deg, #1a1a2e, #16213e);">
          <h3 style="color: var(--accent-yellow); margin-bottom: 12px;">📌 ${event.title}</h3>
          <p style="font-size: 0.95rem; line-height: 1.6;">${event.description}</p>
        </div>

        <p class="narrative" style="margin-top: 20px;">
          ${chapter.narrative}
        </p>

        <div class="stats-row" style="justify-content: center; gap: 30px;">
          <div class="stat-item danger">
            <div class="stat-value" id="certaintyVal3">${Math.round(this.state.certainty)}</div>
            <div class="stat-label">确信度</div>
          </div>
          <div class="stat-item warning">
            <div class="stat-value" id="cobwebVal3">${Math.round(this.state.cobwebIndex)}%</div>
            <div class="stat-label">茧房指数</div>
          </div>
          <div class="stat-item success">
            <div class="stat-value" id="healthVal3">${Math.round(this.state.cognitiveHealth)}</div>
            <div class="stat-label">认知健康度</div>
          </div>
        </div>

        <div style="margin: 15px 0; text-align: center; color: var(--text-muted);">
          第 <span id="chapter3Progress">1</span> / 10 次选择
        </div>

        <div class="feed-container" id="feedContainer3" style="max-height: 450px; overflow-y: auto;">
        </div>

        <button class="btn btn-primary mt-4" id="chapter3End" onclick="Game.endChapter3()" style="display: none;">
          查看结果 →
        </button>
      </div>
    `;

    app.appendChild(container);

    // 加载第一组卡片
    this.loadChapter3Cards();
  },

  // 加载第三章卡片
  loadChapter3Cards() {
    const feed = document.getElementById('feedContainer3');
    if (!feed) return;

    feed.innerHTML = '';

    // 生成一组卡片（第三章：根据茧房指数动态调整）
    const cardSet = this.generateCardSet(this.state.usedCardIds, 3);

    // 标记为已使用
    cardSet.forEach(c => this.state.usedCardIds.push(c.id));

    // 渲染
    this.currentCardSet = cardSet;
    cardSet.forEach((card, i) => {
      const div = document.createElement('div');
      div.innerHTML = this.renderChoiceCard(card, i);
      feed.appendChild(div.firstElementChild);
    });
  },

  // 处理第三章选择
  handleChapter3Choice(cardId, bias, element) {
    // 记录选择
    this.chapter3Choices.push({ cardId, bias });
    this.chapter3ClickCount++;

    // 更新数值
    this.updateChapter3Stats(bias);

    // 更新进度
    const progress = document.getElementById('chapter3Progress');
    if (progress) progress.textContent = Math.min(this.chapter3ClickCount + 1, 10);

    // 隐藏已选卡片
    element.style.opacity = '0';
    element.style.transform = 'translateX(-20px)';

    setTimeout(() => {
      element.remove();

      if (this.chapter3ClickCount >= 10) {
        // 完成10次选择，显示下一章按钮
        const btn = document.getElementById('chapter3End');
        if (btn) btn.style.display = 'inline-flex';
      } else {
        // 显示模拟环节（第三章的模拟更强调多元视角的效果）
        this.showSimulation(bias, true);
      }
    }, 300);
  },

  // 更新第三章数值（多元视角会增加认知健康度）
  updateChapter3Stats(bias) {
    // 确信度下降（接触多元观点）
    this.state.certainty = Utils.clamp(this.state.certainty - 4, 0, 100);

    // 茧房指数下降
    this.state.cobwebIndex = Utils.clamp(this.state.cobwebIndex - 3, 0, 100);

    // 认知健康度上升（多元视角）
    if (bias === 'neutral') {
      this.state.cognitiveHealth = Utils.clamp(this.state.cognitiveHealth + 8, 0, 100);
    } else if (bias !== this.state.userTendency) {
      // 选择与倾向不同的立场，也有帮助
      this.state.cognitiveHealth = Utils.clamp(this.state.cognitiveHealth + 4, 0, 100);
    }

    // 更新显示
    const certaintyEl3 = document.getElementById('certaintyVal3');
    const cobwebEl3 = document.getElementById('cobwebVal3');
    const healthEl3 = document.getElementById('healthVal3');

    if (certaintyEl3) certaintyEl3.textContent = Math.round(this.state.certainty);
    if (cobwebEl3) cobwebEl3.textContent = Math.round(this.state.cobwebIndex) + '%';
    if (healthEl3) healthEl3.textContent = Math.round(this.state.cognitiveHealth);
  },

  // 结束第三章
  endChapter3() {
    this.goToScreen('chapter4');
  },

  // ===== 第四章：平衡之道 =====

  startChapter4() {
    this.state.currentChapter = 4;
    const chapter = GAME_DATA.chapters[3];
    const tips = GAME_DATA.chapter4Tips;

    const app = document.getElementById('app');
    app.innerHTML = '';

    const container = document.createElement('div');
    container.className = 'screen active';
    container.innerHTML = `${this.renderChapterProgress('chapter4')}
      <div style="width: 100%; max-width: 600px;">
        <p class="chapter-title">${chapter.title}</p>
        <h2>${chapter.subtitle}</h2>
        <p class="narrative" style="margin-top: 20px;">${chapter.narrative}</p>

        <div class="stats-row">
          <div class="stat-item ${this.state.cognitiveHealth >= 60 ? 'success' : 'warning'}">
            <div class="stat-value" id="finalHealth">${Math.round(this.state.cognitiveHealth)}</div>
            <div class="stat-label">最终认知健康度</div>
          </div>
        </div>

        <div class="tips-box">
          <h4>💡 破茧重生的四个建议</h4>
          <ul>
            ${tips.map(tip => `
              <li><strong>${tip.icon} ${tip.title}</strong>: ${tip.desc}</li>
            `).join('')}
          </ul>
        </div>

        <button class="btn btn-primary mt-4" onclick="Game.showEnding()">
          查看我的旅程 →
        </button>
      </div>
    `;

    app.appendChild(container);
  },

  // 显示结尾
  showEnding() {
    const app = document.getElementById('app');
    app.innerHTML = '';

    const container = document.createElement('div');
    container.className = 'screen active';
    container.innerHTML = `${this.renderChapterProgress('ending')}
      <div style="width: 100%; max-width: 700px; animation: slideUp 0.6s ease-out">
        <h1 style="margin-bottom: 8px;">🎉 旅程结束</h1>
        <p style="color: var(--text-secondary); margin-bottom: 40px;">你在信息茧房中的足迹</p>

        <div class="ending-stats">
          <div class="ending-stat">
            <div class="value" style="color: var(--accent-red)">${this.state.biasHistory.filter(b => b === 'pro').length}</div>
            <div class="label">次点击支持方</div>
          </div>
          <div class="ending-stat">
            <div class="value" style="color: var(--accent-blue)">${this.state.biasHistory.filter(b => b === 'con').length}</div>
            <div class="label">次点击反对方</div>
          </div>
          <div class="ending-stat">
            <div class="value" style="color: var(--accent-green)">${this.state.biasHistory.filter(b => b === 'neutral').length}</div>
            <div class="label">次点击中立内容</div>
          </div>
          <div class="ending-stat">
            <div class="value" style="color: ${this.state.cognitiveHealth >= 60 ? 'var(--accent-green)' : 'var(--accent-red)'}">
              ${this.state.cognitiveHealth >= 60 ? '健康' : '亚健康'}
            </div>
            <div class="label">认知状态</div>
          </div>
        </div>

        <div class="card mt-4" style="text-align: left;">
          <h3 style="margin-bottom: 16px;">📝 核心洞察</h3>
          <ul style="color: var(--text-secondary); line-height: 2;">
            <li>茧房不是算法强加的，而是<strong style="color: var(--accent-red)">你情我愿</strong>的</li>
            <li>每次"不感兴趣"的点击，都在<strong style="color: var(--accent-red)">加固围墙</strong></li>
            <li>真正的智慧不是坚信自己正确，而是<strong style="color: var(--accent-green)">拥抱复杂性</strong></li>
            <li>打破信息茧房需要的不是更多算法，而是<strong style="color: var(--accent-green)">主动的勇气</strong></li>
          </ul>
        </div>

        <button class="btn btn-secondary mt-4" onclick="location.reload()" style="margin-right: 12px;">
          🔄 再玩一次
        </button>
        <button class="btn btn-primary mt-4" onclick="window.open('https://dccxi.com/trust/', '_blank')">
          了解更多 →
        </button>
      </div>
    `;

    app.appendChild(container);
  }
};

// 启动游戏
document.addEventListener('DOMContentLoaded', () => {
  Game.init();
});
