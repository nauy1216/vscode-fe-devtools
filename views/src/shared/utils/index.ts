import chalk from "chalk";
chalk.level = 1;

export function uuid() {
  return String(+new Date()) + parseInt("" + Math.random() * 10000);
}

type VarType = "String" | "Number" | "Boolean" | "Undefined" | "Null";
function getType(v: any): string {
  return Object.prototype.toString.call(v).slice(8, -1);
}
export function isTypeOf<T>(type: VarType, v: any): v is T {
  if (getType(v) === type) {
    return true;
  }
  return false;
}

export const Logger = {
  info(...args: any[]) {
    const message: any[] = [];
    Array.prototype.slice.call(args).forEach(arg => message.push(chalk.green(arg)));
    // eslint-disable-next-line
    console.log(chalk.bgGreen("info", ...message));
  },
  error(...args: any[]) {
    const message: any[] = [];
    Array.prototype.slice.call(args).forEach(arg => message.push(chalk.red(arg)));
    // eslint-disable-next-line
    console.log(chalk.bgRed("error", ...message));
  },
  warn(...args: any[]) {
    const message: any[] = [];
    Array.prototype.slice.call(args).forEach(arg => message.push(chalk.yellow(arg)));
    // eslint-disable-next-line
    console.log(chalk.yellow("warn", ...message));
  }
};

function isObject(o: any) {
  return (typeof o === "object" || typeof o === "function") && o !== null;
}

// 迭代递归法：深拷贝对象与数组
export const deepClone = (obj: any): any => {
  if (!isObject(obj)) {
    throw new Error("obj 不是一个对象！");
  }

  const isArray = Array.isArray(obj);
  const cloneObj = isArray ? [] : {};
  for (const key in obj) {
    cloneObj[key] = isObject(obj[key]) ? deepClone(obj[key]) : obj[key];
  }

  return cloneObj;
};
