<script>
export default {
    props: ['type', 'name', 'placeholder', 'icon', 'modelValue'],
    emits: ['update:modelValue']
}
</script>

<template>
    <div class="auth-input-container">
        <input
            :name="name"
            class="auth-input"
            :placeholder="placeholder"
            :type="type"
            :value="modelValue"
            @input="$emit('update:modelValue', $event.target.value)"
        />
        <span :class="icon" />
    </div>
</template>