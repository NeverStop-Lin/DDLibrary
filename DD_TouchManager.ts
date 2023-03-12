import DD_EventData from "./DD_EventData";
import DD_Pool from "./DD_Pool";

export default class DD_TouchManager extends Laya.Script {

    static GetTouchData(touchDatas: Laya.Event, tag: string = null): DD_EventData {
        let pool_DD_EventData = DD_Pool.getUsePools("DD_EventData") as DD_EventData[]
        let eventData = pool_DD_EventData.find(item => item.touchID == touchDatas.touchId)
        if (!eventData) eventData = DD_Pool.getItemByCreateFun("DD_EventData", () => new DD_EventData())
        eventData.UpdatedData(touchDatas, tag)
        return eventData
    }

}