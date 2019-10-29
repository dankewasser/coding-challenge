import Vue from 'vue';
import InputText from './components/InputText/InputText.vue';
import Select from './components/Select/Select.vue';
import { formSelectTable } from '../../_data/_formSelectTable';

window.Promise = Promise;
Vue.config.productionTip = false;

/**
 * フォームコントローラ
 */
export default {
  components: {
    InputText,
    Select,
  },
  data() {
    return {
      /**
       * 都道府県リスト
       */
      selectList: {
        provider: formSelectTable.provider,
        pref: formSelectTable.providerToPref,
      },
      /**
       * フィールドの一覧
       * todo: 同名フィールドが誤って複数登録されている場合のエラーハンドリングがあってもいい
       */
      inputFields: [],
      /**
       * 送信中かどうか
       */
      isSending: false,
    };
  },
  computed: {
    /**
     * 電力会社リストを返却
     * @returns {{name: string, value: string}[]}
     */
    getProviderList() {
      return this.selectList.provider;
    },
    /**
     * 都道府県リストに「お選びください」を付加して返却
     * @returns {{name: string, value: string}[]}
     */
    getPrefList() {
      const currentProvider =
        this.$refs.provider && this.$refs.provider.currentValue ? this.$refs.provider.currentValue : 'tepco';
      const newList = this.selectList.pref[currentProvider] ? this.selectList.pref[currentProvider].pref : [];
      return [
        {
          name: 'お選びください',
          value: '',
        },
      ].concat(newList);
    },
  },
  methods: {
    registerInputField(name) {
      this.inputFields.push(name);
    },
    /**
     * リストが変更された場合、引数で与えられたフィールドを初期化する
     * （電力会社が変更される場合に都道府県を初期化するなど）
     * @param name {String} - 変更対象のキー
     */
    onChangeList(name) {
      this.$refs[name].initValue();
    },
    /**
     * すべてのフィールドに対してバリデーションを呼び出し、強制的に値を再取得する
     * @returns {boolean} - すべてバリデーションが通れば true
     */
    validateAll() {
      let isValid = true;
      for (const index in this.inputFields) {
        this.$refs[this.inputFields[index]].validate();
        if (!this.$refs[this.inputFields[index]].isValid) isValid = false;
      }
      return isValid;
    },
    /**
     * Submit時の処理（すべてのフィールドをバリデーションし、それが通れば送信する）
     * todo: もしJSで送信する場合、ここでクエリを組み立ててsubmitする
     */
    onSubmit() {
      if (this.validateAll()) {
        this.isSending = true;
      }
    },
  },
};
