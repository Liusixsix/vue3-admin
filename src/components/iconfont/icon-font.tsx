import {createFromIconfontCN } from '@ant-design/icons-vue';
import { computed, defineComponent,PropType,unref } from 'vue';

let MyIcon:any = createFromIconfontCN({
    // scriptUrl: '//at.alicdn.com/t/font_8d5l8fzk5b87iudi.js', // 在 iconfont.cn 上生成
  });

  export default defineComponent({
      name:'icon-font',
      props:{
        type: {
            type: String as PropType<string>,
            default: ''
        },
        color: {
            type: String as PropType<string>,
            default: 'unset'
        },
        size: {
            type: [Number, String] as PropType<number | string>,
            default: 14
        },
        scriptUrl: { // 阿里图库字体图标路径
            type: String as PropType<string>,
            default: ''
        }
      },
      setup(props,{attrs}){
        if(props.scriptUrl){
            MyIcon = createFromIconfontCN({
                scriptUrl:props.scriptUrl
            })
        }


        const wrapStyleRef = computed(()=>{
            const {color,size} = props
            return {
                color,
                fontSize:`${size}px`
            }
        })

        return () => (
            <MyIcon type={props.type || ''} {...attrs} style={unref(wrapStyleRef)}/>
        )
      }
  })