<template>
  <article class="html-with-components">
    <template v-for="(block, index) in parsedContent" :key="index">
      <div v-if="block.type === 'html'" v-html="block.content"></div>
      <component
        v-else-if="block.type === 'component' && dynamicComponents[block.name]"
        :is="dynamicComponents[block.name]"
        v-bind="block.props"
      />
    </template>
  </article>
</template>


<script setup lang="ts">
import {  computed } from 'vue'
import AppHorizontalBanner from '@/components/App/AppHorizontalBanner.vue'

const props = defineProps<{ content: string }>()

// Регистрируем компоненты, которые будем вставлять
const dynamicComponents = {
  // добавляй сюда другие компоненты
  AppHorizontalBanner
}

// Парсинг контента и пропсов
const parsedContent = computed(() => {
  const regex = /{{(\w+)\|(\{.*?\})}}/g
  const result = []
  let lastIndex = 0
  let match



  while ((match = regex.exec(props.content)) !== null) {git
    const before = props.content.substring(lastIndex, match.index)
    if (before) result.push({ type: 'html', content: before })

    const compName = match[1]
    let compProps = {}
    if (match[2]) {
      try {
        compProps = JSON.parse(match[2])
      } catch (error) {
        console.error('Ошибка парсинга пропсов:', error)
      }
    }

    result.push({ type: 'component', name: compName, props: compProps })

    lastIndex = regex.lastIndex
  }

  const after = props.content.substring(lastIndex)
  if (after) result.push({ type: 'html', content: after })

  return result
})
</script>