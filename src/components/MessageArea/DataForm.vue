<template>
  <form 
  id="data-form-container"
  class="data-form-container"
  ref="form"
  @submit.prevent="handleSubmit"
  >
    <!-- 昵称区域 -->
    <div class="form-item">
      <div class="input-area">
        <input 
        type="text" 
        placeholder="用户昵称" 
        v-model="formData.nickname"
        maxlength="10"
        />
        <span class="tip">{{formData.nickname.length}}/10</span>
      </div>
      <div class="error">{{error.nickname}}</div>
    </div>
    <!-- 内容区域 -->
    <div class="form-item">
      <div class="text-area">
        <textarea 
        placeholder="输入内容"
        v-model="formData.content"
        maxlength="300"
        >
        </textarea>
        <span class="tip">{{formData.content.length}}/300</span>
      </div>
      <div class="error">{{error.content}}</div>
    </div>
    <!-- 提交按钮 -->
    <div class="form-item">
      <div class="button-area">
        <button :disabled="key">
          {{ key ? "提交中..." : "提交"}}
        </button>
      </div>
    </div>
  </form>
</template>

<script>
export default {
  data() {
    return {
      formData : {
        nickname : "",
        content : ""
      },
      error : {
        nickname : "",
        content : ""
      },
      key : false
    }
  },
  methods : {
    handleSubmit(){
      this.error.nickname = this.formData.nickname ? "" : "请输入昵称";
      this.error.content = this.formData.content ? "" : "请输入内容";
      if (this.error.nickname || this.error.content) {
        // 表示有错误不可以提交
        return;
      }
      this.key = true; //表示提交中
      // 向上抛出方法让父级决定 并用回调函数来判断过多次时间提交成功
      this.$emit("submit", this.formData, (successText) => {
        this.$showMessage({
          content : successText,
          type : 'success',
          duration : 1000,
          container : this.$refs.form,
          callback: () => {
            this.key = false;
            this.formData.nickname = "";
            this.formData.content = "";
          }
        })
      });
    }
  }
};
</script>

<style scoped lang="less">
@import "~@/styles/var.less";
.data-form-container {
  margin-bottom: 20px;
  overflow: hidden;
}
.form-item {
  margin-bottom: 8px;
}
.input-area {
  width: 50%;
  position: relative;
}
.text-area {
  position: relative;
}
.tip {
  position: absolute;
  right: 5px;
  bottom: 5px;
  color: #b4b8bc;
  font-size: 12px;
}
input,
textarea {
  display: block;
  width: 100%;
  box-sizing: border-box;
  border: 1px dashed @gray;
  outline: none;
  color: @words;
  font-size: 14px;
  border-radius: 4px;
  &:focus {
    border-color: @primary;
  }
}
input {
  padding: 0 15px;
  height: 40px;
}
textarea {
  resize: none;
  padding: 8px 15px;
  height: 120px;
}
.error {
  margin-top: 6px;
  color: @danger;
  font-size: 14px;
  height: 20px;
  line-height: 20px;
}
button {
  position: relative;
  cursor: pointer;
  border: none;
  outline: none;
  width: 100px;
  height: 34px;
  color: #fff;
  background-color: @primary;
  border-radius: 4px;
  &:hover {
    background-color: darken(@primary, 10%);
    &:disabled {
        background-color: lighten(@primary, 20%);
        cursor: not-allowed;
    }
  }
}
</style>
