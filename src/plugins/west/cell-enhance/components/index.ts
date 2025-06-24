import type { MaProTableExpose } from '@mineadmin/pro-table'
import type { TableColumnRenderer } from '@mineadmin/table'

export default defineComponent({
  name: 'CellEnhance',
  props: {
    data: {
      type: Object as PropType<TableColumnRenderer>,
      required: true,
    },
    props: {
      type: Object as PropType<Record<string, any>>,
      default: () => ({}),
    },
    proxy: {
      type: Object as PropType<MaProTableExpose>,
      required: true,
    },
  },
  setup(props) {
    // 缓存已解析的组件
    const resolvedComponent = ref<Component | null>(null)
    // 动态导入组件
    const components = import.meta.glob<{ default: any }>('./cell/cell-*.vue')

    // 默认组件
    const DefaultComponent = defineComponent({
      render() {
        return h('div', {}, '未找到对应组件，请检查类型！')
      },
    })

    // 计算组件名称
    const componentName = computed(() => {
      if (!props.props?.type) {
        console.warn('Type is missing in props')
        return null
      }
      return `./cell/cell-${props.props.type}.vue`
    })

    watchEffect(() => {
      if (!componentName.value) {
        resolvedComponent.value = DefaultComponent
        return
      }
      const component = components[componentName.value]
      resolvedComponent.value = component
        ? defineAsyncComponent({
          loader: component,
          onError(error) {
            console.error(`Error loading component: ${error.message}`)
          },
        })
        : DefaultComponent
    })

    return () => {
      if (!resolvedComponent.value) {
        return h('div', {}, '组件加载失败')
      }

      return h(resolvedComponent.value, {
        data: props.data,
        proxy: props.proxy,
        props: props.props,
      })
    }
  },
})
