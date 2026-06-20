/**
 * ╔════════════════════════════════════════════════════╗
 * ║  DSE 数学笔记 · 产品配置文件（多产品/多币种版）    ║
 * ║  支持：多产品、多币种（HKD / CNY）、多文件下载     ║
 * ╚════════════════════════════════════════════════════╝
 *
 * 配置规则：
 * 1. 每个产品必须有唯一 id
 * 2. priceRanges 里按币种配置价格区间（cents）
 * 3. files 里放该产品对应的所有下载文件
 *
 * 匹配逻辑：
 * 1. 优先用 URL 中的 product 参数精确匹配（如 ?product=cp01-answer）
 * 2. 其次用付款金额 + 币种自动匹配
 */

const PRODUCTS = [
  {
    id: "26cp01-answer",
    name: "2026 CP 01 参考答案",
    priceRanges: {
      hkd: [2800, 4000],   // HKD 28.00 - 40.00
      cny: [2400, 3500]    // RMB 24.00 - 35.00
    },
    files: [
      {
        name: "DSE 模拟卷 2026 CP 01 · 参考答案",
        desc: "逐题答案与评分标准",
        format: "PDF",
        icon: "📘",
        url: "https://1drv.ms/b/c/9c6c235d3dfcdcf4/IQALvIDejv4xTJ8id3hhBovYAUFdGHcYBYZuo4zOwhXzMGA?e=jujn9i"
      }
    ]
  },
  {
    id: "test",
    name: "Test",
    priceRanges: {
      hkd: [400, 400]   // HKD 4.00
    },
    files: [
      {
        name: "Test",
        desc: "Test",
        format: "PDF",
        icon: "📘",
        url: "https://1drv.ms/b/c/9c6c235d3dfcdcf4/IQALvIDejv4xTJ8id3hhBovYAUFdGHcYBYZuo4zOwhXzMGA?e=jujn9i"
      }
    ]
  }
  // ════════════════════════════════════════════════════════
  // 添加新产品模板（复制后修改）：
  // ════════════════════════════════════════════════════════
  // {
  //   id: "cp02-answer",
  //   name: "2026 CP 02 参考答案",
  //   priceRanges: {
  //     hkd: [2800, 4000],
  //     cny: [2400, 3500]
  //   },
  //   files: [
  //     {
  //       name: "DSE 模拟卷 2026 CP 02 · 参考答案",
  //       desc: "逐题答案与评分标准",
  //       format: "PDF",
  //       icon: "📘",
  //       url: "你的 OneDrive / Google Drive 链接"
  //     }
  //   ]
  // },
  // {
  //   id: "cp-bundle",
  //   name: "2026 CP 01-06 全套答案",
  //   priceRanges: {
  //     hkd: [12800, 18000],   // 套餐 HKD 128-180
  //     cny: [10800, 15000]    // 套餐 RMB 108-150
  //   },
  //   files: [
  //     { name: "CP 01 参考答案", ... },
  //     { name: "CP 02 参考答案", ... },
  //     // ...
  //   ]
  // },
  // ════════════════════════════════════════════════════════
];

/**
 * 根据产品 ID、付款金额和币种匹配产品
 * @param {number} amount - 付款金额（cents）
 * @param {string} currency - 币种（hkd, cny 等）
 * @param {string} productId - 可选的 URL 参数 product
 * @returns {Array} 匹配到的产品列表
 */
function findProducts(amount, currency, productId) {
  // 1. 如果 URL 带了 product 参数，精确匹配
  if (productId) {
    const target = PRODUCTS.find(p => p.id === productId);
    return target ? [target] : [];
  }

  // 2. 用金额 + 币种匹配
  const ccy = (currency || 'hkd').toLowerCase();

  return PRODUCTS.filter(product => {
    const range = product.priceRanges[ccy];
    if (!range) return false;
    return amount >= range[0] && amount <= range[1];
  });
}
