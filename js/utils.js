// === 工具函数 ===

const Utils = {
  // 随机选择数组中的一个元素
  randomChoice: (arr) => arr[Math.floor(Math.random() * arr.length)],

  // 随机打乱数组
  shuffle: (arr) => {
    const newArr = [...arr];
    for (let i = newArr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newArr[i], newArr[j]] = [newArr[j], newArr[i]];
    }
    return newArr;
  },

  // 数值范围映射
  map: (value, inMin, inMax, outMin, outMax) => {
    return ((value - inMin) * (outMax - outMin)) / (inMax - inMin) + outMin;
  },

  // 限制数值范围
  clamp: (value, min, max) => Math.min(Math.max(value, min), max),

  // 缓动数值
  animateValue: (obj, prop, start, end, duration, callback) => {
    const startTime = performance.now();
    
    const update = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      // easeOutCubic
      const eased = 1 - Math.pow(1 - progress, 3);
      
      obj[prop] = start + (end - start) * eased;
      
      if (progress < 1) {
        requestAnimationFrame(update);
      } else if (callback) {
        callback();
      }
    };
    
    requestAnimationFrame(update);
  },

  // 延迟执行
  delay: (ms) => new Promise(resolve => setTimeout(resolve, ms)),

  // 创建元素
  createElement: (tag, className, content) => {
    const el = document.createElement(tag);
    if (className) el.className = className;
    if (content) el.innerHTML = content;
    return el;
  },

  // 获取带权重的随机选择
  weightedRandom: (items, weights) => {
    const totalWeight = weights.reduce((a, b) => a + b, 0);
    let random = Math.random() * totalWeight;
    
    for (let i = 0; i < items.length; i++) {
      random -= weights[i];
      if (random <= 0) return items[i];
    }
    return items[items.length - 1];
  },

  // 格式化数值显示
  formatNumber: (num) => Math.round(num).toString(),

  // 获取来源信息
  getSourceInfo: (sourceId) => {
    return GAME_DATA.sources[sourceId] || { name: '未知', icon: '❓', color: '#888' };
  },

  // 计算茧房指数
  calculateCobweb: (biasHistory, totalClicks) => {
    if (totalClicks === 0) return 0;
    
    // 计算点击的同质化程度
    const proCount = biasHistory.filter(b => b === 'pro').length;
    const conCount = biasHistory.filter(b => b === 'con').length;
    const neutralCount = biasHistory.filter(b => b === 'neutral').length;
    
    // 极端程度 = max(同侧比例) - 0.5
    const proRatio = proCount / totalClicks;
    const conRatio = conCount / totalClicks;
    const maxSide = Math.max(proRatio, conRatio);
    
    // 茧房指数 = 极端程度 * 100
    return (maxSide - 0.33) * 150; // 调整系数
  }
};

// 导出
window.Utils = Utils;
