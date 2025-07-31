interface Tool {
  formatMoney: (num?: string | number, fixed?: number) => string;
}

const tool:Tool = {
    formatMoney: (num, fixed = 2) => {
       if (!num) return '0.00'
        // 如果num是字符串，则先转为数字
        num = typeof num === 'string' ? Number(num) : num
        return num.toFixed(fixed)
    },
}

export default tool
