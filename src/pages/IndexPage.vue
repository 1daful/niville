<template>
  <q-page class="flex flex-center">
    <div class="q-pa-md bg-white shadow rounded col-6">
      <h2 class="text-indigo">Welcome to Niville</h2>

      <div v-if="!user">
        <q-btn color="primary" label="Sign In with Email" @click="signIn" />
      </div>

      <div v-else>
        <p class="text-bold">Hello {{ profile?.name }}</p>
        <p>Balance: ₦{{ profile?.balance }}</p>

        <q-btn color="positive" label="Deposit ₦1000" @click="doAction('deposit', 1000)" />
        <q-btn color="negative" label="Withdraw ₦500" class="q-ml-sm" @click="doAction('withdraw', 500)" />
      </div>
    </div>
  </q-page>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  "https://YOUR-PROJECT.supabase.co",
  "public-anon-key"
);

const user = ref(null);
const profile = ref(null);

async function signIn() {
  const { data, error } = await supabase.auth.signInWithPassword({
    email: "test@example.com",
    password: "123456",
  });
  if (!error) {
    user.value = data.user;
    fetchProfile();
  }
}

async function fetchProfile() {
  const { data } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user.value.id)
    .single();
  profile.value = data;
}

async function doAction(action, amount) {
  const res = await fetch("https://YOUR-PROJECT.supabase.co/functions/v1/payments", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ action, userId: user.value.id, amount }),
  });
  const data = await res.json();
  if (data.success) profile.value.balance = data.balance;
}
</script>
