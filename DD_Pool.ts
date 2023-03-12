export default class DD_Pool extends Laya.Pool {

    /**
    * <p>根据传入的对象类型标识字符，获取对象池中此类型标识的一个对象实例。</p>
    * <p>当对象池中无此类型标识的对象时，则使用传入的创建此类型对象的函数，新建一个对象返回。</p>
    * @param sign 对象类型标识字符。
    * @param createFun 用于创建该类型对象的方法。
    * @param caller this对象
    * @return 此类型标识的一个对象。
    */
    static getItemByCreateFun(sign: string, createFun?: Function): any {
        if (createFun) this.SetItemCreateFun(sign, createFun)
        let poolItem = Laya.Pool.getItemByCreateFun(sign, this.CreatFun.get(sign));
        if (this.UerPools.has(sign) == false) this.UerPools.set(sign, [])
        this.UerPools.get(sign).push(poolItem)
        return poolItem
    }

    /**
      * 将对象放到对应类型标识的对象池中。
      * @param sign 对象类型标识字符。
      * @param item 对象。
      */
    static recover(sign: string, item: any) {
        let uerPool = this.UerPools.get(sign)
        let index = uerPool.indexOf(item)
        if (index >= 0) uerPool.splice(index, 1)
        Laya.Pool.recover(sign, item)
    }

    private static CreatFun: Map<string, Function> = new Map();
    static SetItemCreateFun(sign: string, createFun: Function) {
        this.CreatFun.set(sign, createFun)
    }

    private static UerPools: Map<string, any[]> = new Map()
    static getUsePools(sign: string): any[] {
        if (this.UerPools.has(sign) == false) this.UerPools.set(sign, [])
        return this.UerPools.get(sign)
    }

}