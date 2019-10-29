import * as Functions from '../../functions/functions';

/**
 * セレクトボックス
 */
export default {
  name: 'Select',
  props: {
    name: String,
    heading: String,
    list: Array,
    errorMessage: String,
    childList: String,
    initialValue: String,
    validateType: String,
  },
  data() {
    return {
      /**
       * 現在の入力値
       */
      currentValue: '',
      /**
       * バリデーションを通っているか否か
       */
      isValid: false,
      /**
       * エラー文を表示するか否か（初期表示時はバリデーションエラーであっても非表示にしておくため）
       */
      isShowError: false,
    };
  },
  mounted() {
    this.register();
    this.initValue();
  },
  computed: {
    /**
     * 選択されている値
     */
    selected: {
      /**
       * 現在の値を返却
       * @returns {*|StringConstructor|String}
       */
      get() {
        return this.currentValue;
      },
      /**
       * 値が変わっていたらバリデーションを呼び出す
       * @param value {string}
       */
      set(value) {
        if (this.currentValue !== value) {
          this.currentValue = value;
          if (this.childList) {
            this.$emit('change-list', this.childList);
          }
          this.validate();
        }
      },
    },
  },
  methods: {
    /**
     * 値を初期化
     */
    initValue() {
      this.currentValue = this.initialValue;
      this.isValid = false;
      this.isShowError = false;
    },
    /**
     * 自分自身の存在を親に通知
     */
    register() {
      this.$emit('register', this.name);
    },
    /**
     * バリデーション
     */
    validate() {
      const isValid = Functions.validate(this.currentValue, this.validateType);
      this.isValid = isValid;
      this.isShowError = !isValid;
    },
  },
};
