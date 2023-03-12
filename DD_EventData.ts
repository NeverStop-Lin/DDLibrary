import DD_Pool from "./DD_Pool";
import DD_UI from "./DD_UI";

export default class DD_EventData {

    /** 标签 */
    tag: any = null;

    /** 触摸ID */
    touchID: any = null;
    /** 上一次的位置 */
    lastPos: Laya.Point = null;
    /** 本次位置 */
    currPos: Laya.Point = new Laya.Point();
    /** 距离上次的增量  */
    deltaPos: Laya.Point = new Laya.Point();
    /** 目标节点 */
    target: Laya.Sprite = null;
    /** 事件当前冒泡对象 */
    currentTarget: Laya.Sprite = null;


    /** 符合要求的 */
    IsValid(eventData: Laya.Event): boolean {
        if (this.touchID == null || this.touchID == eventData.touchId) return true
        return false
    }
    /** 更新数据 */
    UpdatedData(eventData: Laya.Event, tag: string): boolean {
        if (this.IsValid(eventData)) {

            if (this.tag == null) { this.tag = tag }

            if (this.currentTarget == null) {
                this.currentTarget = eventData.currentTarget
                Laya.stage.off(Laya.Event.MOUSE_OUT, this, this.Reset)
                Laya.stage.on(Laya.Event.MOUSE_OUT, this, this.Reset)
            }
            this.target = eventData.target
            if (this.touchID == null) this.touchID = eventData.touchId;
            if (this.lastPos == null) {
                this.lastPos = new Laya.Point().copy(eventData.touchPos)
            } else if (this.currPos.distance(eventData.touchPos.x, eventData.touchPos.y) > 0) {
                this.lastPos.copy(this.currPos)
            }

            this.currPos.copy(eventData.touchPos)

            this.deltaPos.setTo(
                this.currPos.x - this.lastPos.x,
                this.currPos.y - this.lastPos.y,
            )
            return true
        } else {
            return false;
        }
    }

    Reset(event: Laya.Event) {
        if (event.touchId == this.touchID) {
            DD_UI.ShowToast({title:"Reset"})
            Laya.stage.off(Laya.Event.MOUSE_OUT, this, this.Reset)
            this.touchID = null;
            this.currentTarget = null;
            this.target = null;
            this.lastPos = null;
            this.tag = null;
            DD_Pool.recover("DD_EventData", this)
        }
    }


}

