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
    name: "2026 CP 01 Answer",
    amountRange: [28000, 40000], 
    files: [
      {
        name: "DSE 模拟卷 2026 CP 01 · 参考答案",
        desc: "匹配全部讲义章节，共 27 章",
        format: "PDF",
        icon: "📘",
        url: "https://1drv.ms/b/c/9c6c235d3dfcdcf4/IQALvIDejv4xTJ8id3hhBovYAUFdGHcYBYZuo4zOwhXzMGA?e=jujn9i"   // ← 替换为你的链接
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
