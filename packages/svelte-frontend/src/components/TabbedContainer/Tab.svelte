<script>
  import { getContext } from 'svelte';
  import { TABS } from './Tabs.svelte';

  const tab = {};
  const { registerTab, selectTab, selectedTab } = getContext(TABS);

  registerTab(tab);
</script>

<button class="bg-green-{$selectedTab === tab ? '500' : '800'} p-6 ml-6 text-white text-center font-extrabold rounded-b-lg" on:click="{() => selectTab(tab)}">
  <slot></slot>
</button>