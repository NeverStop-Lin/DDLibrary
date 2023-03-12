export default class DD_UI {

    static ShowToastView: Laya.View
    static ShowToast(data: { title: string, duration?: number }) {
        let defaultData = { title: "提示内容", duration: 1000 }
        Object.assign(defaultData, data)


        if (this.ShowToastView) {
            Laya.Tween.clearAll(this.ShowToastView)
            this.ShowToastView.visible = false;
            Laya.stage.removeChild(this.ShowToastView);
            this.ShowToastView.destroy();
            this.ShowToastView = null;

            this.ShowToastView = new Laya.View();
        } else {
            this.ShowToastView = new Laya.View();
            this.ShowToastView.scaleX = 0;
            this.ShowToastView.scaleY = 0;
            Laya.Tween.to(this.ShowToastView, { scaleX: 1, scaleY: 1 }, 150)
        }


        const bg = new Laya.Sprite();
        const cornerRadius = 6;
        const width = Math.min(Math.max(24 + defaultData.title.length * 24, 150), 500)
        



        this.ShowToastView.width = width
        this.ShowToastView.addChild(bg);
        //创建文本并设置样式
        const tipsText = new Laya.Label();
        tipsText.width = width - 20;
        tipsText.height = 0;
        tipsText.text = defaultData.title;
        tipsText.valign = "middle";
        tipsText.align = "center";
        tipsText.fontSize = 24;
        tipsText.leading=5
        tipsText.color = "#ffffff";
        tipsText.wordWrap = true
        tipsText.overflow = "hidden"
        this.ShowToastView.addChild(tipsText);
        tipsText.centerX = 0
        tipsText.centerY = 0
        this.ShowToastView.visible = true;
        this.ShowToastView.pivotX = this.ShowToastView.width / 2
        this.ShowToastView.pivotY = this.ShowToastView.height / 2
        this.ShowToastView.x = Laya.stage.width / 2;
        this.ShowToastView.y = Laya.stage.height / 2;


        const height = Math.max(tipsText.height+20,65);
        this.ShowToastView.height = height
        //用来定义提示框的形状，采用圆角矩形
        const shape = [["moveTo", cornerRadius, 0],
        ["arcTo", width, 0, width, cornerRadius, cornerRadius],
        ["arcTo", width, height, width - cornerRadius, height, cornerRadius],
        ["arcTo", 0, height, 0, height - cornerRadius, cornerRadius],
        ["arcTo", 0, 0, cornerRadius, 0, cornerRadius],
        ["closePath"]];
        //绘制背景
        bg.graphics.drawPath(0, 0, shape, { fillStyle: "#000000" });
        bg.alpha = 0.65;

        Laya.stage.addChild(this.ShowToastView);

        Laya.Tween.to(this.ShowToastView, { scaleX: 0, scaleY: 0 }, 150, null, Laya.Handler.create(this, () => {
            this.ShowToastView.visible = false;
            Laya.stage.removeChild(this.ShowToastView);
            this.ShowToastView.destroy();
            this.ShowToastView = null;
        }), defaultData.duration)
    }



    /**
     在Laya场景中显示一个带有文本的提示框
     @param tips 要显示的文本内容
     @param bgColor 提示框的背景颜色，默认为黑色
     @param textColor 提示框文本的颜色，默认为白色
    */
    static showTips(tips: string): void {



    }


    static showTips2(tips: string, bgColor: string = "#ffffff", textColor: string = "#000000"): void {
        const tipsView = new Laya.View(),
            bg = new Laya.Sprite(),
            height = 100;
        tipsView.addChild(bg);

        const tipsText = new Laya.Label();
        tipsText.text = tips;
        tipsText.fontSize = 30;
        tipsView.addChild(tipsText);

        const textWidth = 200; // 计算文本的实际宽度
        if (textWidth > 200 - 20) {
            const scaleX = (textWidth + 20) / 200; // 计算文本需要缩放的比例
            tipsText.scale(scaleX, 1); // 缩放文本
        }

        const bounds = tipsText.getBounds();
        const padding = 10; // 边框和文本的内边距
        const width = bounds.width + padding * 2;
        bg.graphics.drawRect(-padding, -padding, width, height, bgColor); // 绘制背景

        if (this.isDarkColor(bgColor)) {
            // 背景色较暗时，文字颜色改为白色
            textColor = "#ffffff";
        }
        tipsText.color = textColor; // 应用文字颜色

        tipsView.visible = true;
        tipsView.centerX = 0;
        tipsView.centerY = 0;
        Laya.stage.addChild(tipsView);

        // 隐藏提示框
        Laya.timer.once(2000, null, () => {
            tipsView.visible = false;
            Laya.stage.removeChild(tipsView);
            tipsView.destroy();
        });
    }

    /**
     * 判断颜色是否较暗
     */
    static isDarkColor(color: string): boolean {
        color = color.replace("#", "");
        const R = parseInt(color.substr(0, 2), 16),
            G = parseInt(color.substr(2, 2), 16),
            B = parseInt(color.substr(4, 2), 16),
            brightness = Math.round((R * 299 + G * 587 + B * 114) / 1000);
        return brightness < 128;
    }




}