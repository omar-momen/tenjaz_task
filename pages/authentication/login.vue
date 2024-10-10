<template>
  <div class="login-page">
    <UContainer>
      <Logo />
      <h1>login</h1>
      <UButton @click="login">login</UButton> |
      <UButton @click="fackLogin">fackLogin</UButton>
    </UContainer>
  </div>
</template>

<script lang="ts" setup>
definePageMeta({
  title: "login",
  layout: "auth",
});

const login = async () => {
  const user = await useAuthStore().logIn({
    name: "Omar",
    token: "3%o8i}_;3D4bF]G5@22r2)Et1&mLJ4?$@+16",
  });
};
const fackLogin = () => {
  useAuthStore().logIn(
    {
      name: "Omar",
      token: "3%o8i}_;3D4bF]G5@22r2)Et1&mLJ4?$@+16",
    },
    true
  );
};
</script>
