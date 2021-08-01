export default function (resp) {
    return {
        mounted() {
            this.$Bus.$on("setMainScroll", this.handleSetMainScroll);
            this.$refs[resp].addEventListener('scroll', this.handleMainScroll);
        },
        beforeDestroy() {
            this.$Bus.$emit("mainScroll");
            this.$Bus.$off("setMainScroll", this.handleSetMainScroll);
            this.$refs[resp].removeEventListener("scroll", this.handleMainScroll);
        },
        methods: {
            handleMainScroll() {
                this.$Bus.$emit("mainScroll", this.$refs[resp]);
            },
            handleSetMainScroll(val) {
                this.$refs[resp].scrollTop = val;
            },
        }
    }
};