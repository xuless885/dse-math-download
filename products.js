/**
 * ╔══════════════════════════════════════════════╗
 * ║  DSE 数学笔记 · 产品配置文件                ║
 * ║  修改这个文件来管理你的产品和下载链接       ║
 * ╚══════════════════════════════════════════════╝
 *
 * 匹配规则：Stripe 付款金额（港币 cents）落在哪个范围，就匹配哪个产品
 * 如果同一笔订单买了多个产品（金额落在套餐范围内），返回套餐对应的文件列表
 *
 * 改价后只需更新 amountRange，不需要改其他地方
 */

const PRODUCTS = [
  {
    name: "全套练习册",
    amountRange: [28000, 40000],   // HKD 280 - HKD 400（cents）
    files: [
      {
        name: "DSE 数学练习册 · 全集",
        desc: "匹配全部讲义章节，共 27 章",
        format: "PDF",
        icon: "📘",
        url: "https://drive.google.com/file/d/XXXXXXXXX/view"   // ← 替换为你的链接
      }
    ]
  },
  {
    name: "全套解题教程",
    amountRange: [38000, 50000],   // HKD 380 - HKD 500
    files: [
      {
        name: "DSE 数学解题教程 · 全集",
        desc: "逐题精讲，匹配全部讲义章节",
        format: "PDF",
        icon: "📙",
        url: "https://drive.google.com/file/d/XXXXXXXXX/view"   // ← 替换为你的链接
      }
    ]
  },
  {
    name: "模拟卷全集",
    amountRange: [29000, 41000],   // HKD 290 - HKD 410
    files: [
      {
        name: "DSE 数学模拟卷 · 全集",
        desc: "5-10 套全真模拟，对标 DSE 难度",
        format: "PDF",
        icon: "📝",
        url: "https://drive.google.com/file/d/XXXXXXXXX/view"   // ← 替换为你的链接
      }
    ]
  },
  {
    name: "超级套餐（练习册 + 解题教程 + 模拟卷）",
    amountRange: [68000, 90000],   // HKD 680 - HKD 900
    files: [
      {
        name: "DSE 数学练习册 · 全集",
        desc: "匹配全部讲义章节，共 27 章",
        format: "PDF",
        icon: "📘",
        url: "https://drive.google.com/file/d/XXXXXXXXX/view"
      },
      {
        name: "DSE 数学解题教程 · 全集",
        desc: "逐题精讲，匹配全部讲义章节",
        format: "PDF",
        icon: "📙",
        url: "https://drive.google.com/file/d/XXXXXXXXX/view"
      },
      {
        name: "DSE 数学模拟卷 · 全集",
        desc: "5-10 套全真模拟，对标 DSE 难度",
        format: "PDF",
        icon: "📝",
        url: "https://drive.google.com/file/d/XXXXXXXXX/view"
      }
    ]
  }
  // ══════════════════════════════════════════
  // 添加新产品模板（复制下面这段）：
  // ══════════════════════════════════════════
  // {
  //   name: "产品名称",
  //   amountRange: [最小金额_cents, 最大金额_cents],
  //   files: [
  //     {
  //       name: "文件名",
  //       desc: "简短描述",
  //       format: "PDF",
  //       icon: "📄",
  //       url: "你的 Google Drive / 网盘链接"
  //     }
  //   ]
  // },
  // ══════════════════════════════════════════
];

/**
 * 根据付款金额匹配产品
 * @param {number} amount - 付款金额（cents）
 * @param {string} currency - 币种（hkd, usd 等）
 * @returns {Array} 匹配到的产品列表
 */
function findProducts(amount, currency) {
  // 非 HKD 的交易跳过匹配（比如你测试用的 USD 链接）
  if (currency.toLowerCase() !== 'hkd') return [];

  return PRODUCTS.filter(product =>
    amount >= product.amountRange[0] && amount <= product.amountRange[1]
  );
}
