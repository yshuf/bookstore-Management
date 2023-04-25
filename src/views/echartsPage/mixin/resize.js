export const resizeMixin = {
    data() {
        return {
            refrshScaleHandler: {
                resize: null,
                pageShow: null,
            },
        };
    },
    mounted() {
        this.initRefreshScale();
        this.refreshScale();
    },
    beforeDestroy() {
        this.destoryRefreshScale();
    },
    methods: {
        initRefreshScale() {
            this.refrshScaleHandler = {
                resize: this.refreshScale.bind(this),
                pageShow: (e) => {
                    if (e.persisted) {
                        // 浏览器后退的时候重新计算
                        this.refreshScale();
                    }
                },
            };
            window.addEventListener(
                "pageshow",
                this.refrshScaleHandler.pageShow,
                false
            );
            window.addEventListener(
                "resize",
                this.refrshScaleHandler.resize,
                false
            );
        },
        destoryRefreshScale() {
            window.removeEventListener(
                "pageshow",
                this.refrshScaleHandler.pageShow,
                false
            );
            window.removeEventListener(
                "resize",
                this.refrshScaleHandler.resize,
                false
            );
        },
        refreshScale() {
            const wrapDom = this.$refs.screen;
            const docWidth = document.documentElement.clientWidth;
            const docHeight = document.documentElement.clientHeight;
            const designWidth = 1920;
            const designHeight = 1080;
            let widthRatio = docWidth / designWidth;
            let heightRatio = docHeight / designHeight;
            // const usefulRatio = widthRatio < heightRatio ? widthRatio : heightRatio;
            // const offset =
            //   usefulRatio === widthRatio
            //     ? `left: 0;top:${(docHeight - designHeight * usefulRatio) / 2}px;`
            //     : `left:${(docWidth - designWidth * usefulRatio) / 2}px;top:0;`;
            wrapDom.style = `transform:scale(${widthRatio}, ${heightRatio});transform-origin:left top;`;
            // this.dialogResize(widthRatio, heightRatio, designHeight, designWidth);
            // 应对浏览器全屏切换前后窗口因短暂滚动条问题出现未占满情况
            setTimeout(() => {
                const lateWidth = document.documentElement.clientWidth;
                const lateHeight = document.documentElement.clientHeight;
                if (lateWidth === docWidth) return;
                widthRatio = lateWidth / designWidth;
                heightRatio = lateHeight / designHeight;
                // const usefulRatio = widthRatio < heightRatio ? widthRatio : heightRatio;
                // const offset =
                //   usefulRatio === widthRatio
                //     ? `left: 0;top:${(lateHeight - designHeight * usefulRatio) / 2}px;`
                //     : `left:${(lateWidth - designWidth * usefulRatio) / 2}px;top:0;`;
                wrapDom.style = `transform:scale(${widthRatio}, ${heightRatio});transform-origin:left top;`;
                // this.dialogResize(widthRatio, heightRatio, designHeight, designWidth);
            }, 0);
        },
        /**
         * 弹窗resize
         * @param isWidthRaido 宽高比是否小于设计稿的宽高比
         * @param usefulRatio 有效缩放比例
         * @param totalHeight 标准高度
         * @param totalWidth 标准宽度
         */
        dialogResize(widthRatio, heightRatio, totalHeight, totalWidth) {
            const dialogRef = document.querySelectorAll(".el-dialog__wrapper");
            dialogRef.forEach((dom) => {
                const dialogDom = dom.querySelector(".el-dialog");
                // 弹窗宽度
                // const width = dialogDom.style.width;
                // const widthNumber = width.replace('px', '') || 0;
                // 弹窗高度
                const heightString = dom.getAttribute("height");
                if (heightString) {
                    // const height = heightString
                    //   ? Number(dom.getAttribute('height').replace('px', ''))
                    //   : 0;
                    // if (isWidthRatio) {
                    //   const clientHeight = document.documentElement.clientHeight;
                    //   const offset = `top:${(clientHeight - height * usefulRatio) /
                    //     2}px;left:${((totalWidth - widthNumber) * usefulRatio) / 2}px;`;
                    //   dialogDom.style = `transform:scale(${usefulRatio});width:${width};${offset};`;
                    // } else {
                    // const clientWidth = document.documentElement.clientWidth;
                    // const offset = `top:${((totalHeight - height) * usefulRatio) /
                    //   2}px;left:${(clientWidth - widthNumber * usefulRatio) / 2}px;`;
                    dialogDom.style = `transform:scale(${widthRatio}, ${heightRatio});`;
                    // }
                } else {
                    // if (isWidthRatio) {
                    //   const offset = `top:0vh;left:${((totalWidth - widthNumber) *
                    //     usefulRatio) /
                    //     2}px;`;
                    //   dialogDom.style = `transform:scale(${usefulRatio});width:${width};${offset};`;
                    // } else {
                    // const clientWidth = document.documentElement.clientWidth;
                    // const offset = `top:0vh;left:${(clientWidth -
                    //   widthNumber * usefulRatio) /
                    //   2}px;`;
                    dialogDom.style = `transform:scale(${widthRatio}, ${heightRatio});`;
                    // }
                }
            });
        },
    },
};
