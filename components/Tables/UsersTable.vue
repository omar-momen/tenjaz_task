<script lang="ts" setup>
type User = {
  id?: number;
  name: string;
  email: string;
  status: string;
};

// Columns
const columns = [
  {
    key: "id",
    label: "#",
    sortable: true,
  },
  {
    key: "name",
    label: "Name",
    sortable: true,
  },
  {
    key: "email",
    label: "Email",
  },
  {
    key: "status",
    label: "Status",
  },
  {
    key: "actions",
    label: "Actions",
    sortable: false,
  },
];

// Selected Rows
const selectedRows = ref<User[]>([]);
function select(row: User) {
  const index = selectedRows.value.findIndex((item) => item.id === row.id);
  if (index === -1) {
    selectedRows.value.push(row);
  } else {
    selectedRows.value.splice(index, 1);
  }
}

// Status Options
const statusOptions = [
  {
    label: "Active",
    key: "active",
  },
  {
    label: "InActive",
    key: "inactive",
  },
];

const search = ref("");
const selectedStatus = ref<string[]>([]);

const resetFilters = () => {
  search.value = "";
  selectedStatus.value = [];
};

const table_loading = ref(false);
table_loading.value = true;
const { data: users, refresh } = await useFetch<User[]>("/api/fake-users");
table_loading.value = false;

const filteredUsers = computed(() => {
  return users.value?.filter((user: User) => {
    const status = selectedStatus.value.length
      ? selectedStatus.value.includes(user.status)
      : true;

    const searchFilter = search.value
      ? user.name.toLowerCase().includes(search.value.toLowerCase()) ||
        user.email.toLowerCase().includes(search.value.toLowerCase())
      : true;

    return status && searchFilter;
  });
});

// Delete User
const delete_loading = ref(false);
const item_id_to_delete = ref<number | null>(null);
const delete_user_dialog = ref(false);
const deleteUser = async () => {
  delete_loading.value = true;
  await useNuxtApp().$axios(`/api/fake-users`, {
    params: { id: item_id_to_delete.value },
    method: "DELETE",
  });

  // await refresh();
  users.value = users.value?.filter(
    (user: User) => user.id !== item_id_to_delete.value
  );
  delete_loading.value = false;

  delete_user_dialog.value = false;
  item_id_to_delete.value = null;
};

// Edit User
const current_user = ref<User | null>(null);
const edit_mode = computed(() => !!current_user.value);
const edit_add_user_dialog = ref(false);
watch(edit_add_user_dialog, (value) => {
  if (!value) {
    current_user.value = null;
    state.name = "";
    state.email = "";
    state.status = true;
  } else {
    if (current_user.value) {
      state.name = current_user.value.name;
      state.email = current_user.value.email;
      state.status = current_user.value.status === "active";
    }
  }
});

// ====== State
const state = reactive({
  name: "",
  email: "",
  status: true,
});

// ======= Schema
import { object, string, boolean } from "yup";

const schema = object({
  name: string().required(),
  email: string().email().required(),
  status: boolean().required(),
});
async function onError(event: { errors: { id: string }[] }) {
  const element = document.getElementById(event.errors[0].id);
  element?.focus();
  element?.scrollIntoView({ behavior: "smooth", block: "center" });
}

// ====== Save Form
// const toast = useToast();
const save_user_loading = ref(false);
const saveUser = async () => {
  save_user_loading.value = true;

  const user: User = {
    name: state.name,
    email: state.email,
    status: state.status ? "active" : "inactive",
  };

  if (edit_mode.value) {
    await useNuxtApp().$axios(`/api/fake-users`, {
      method: "PUT",
      data: {
        id: current_user.value?.id,
        ...user,
      },
    });

    // await refresh();
    let index: number = users.value?.findIndex(
      (item: User) => item.id === current_user.value?.id
    );
    if (index !== -1) {
      users.value[index] = { id: current_user.value?.id, ...user };
    }
  } else {
    await useNuxtApp().$axios("/api/fake-users", {
      method: "POST",
      data: user,
    });

    // await refresh();
    users.value?.push({ id: users.value?.length + 1, ...user });
  }

  save_user_loading.value = false;
  edit_add_user_dialog.value = false;
};
</script>

<template>
  <div class="user-table">
    <UCard
      class="w-full"
      :ui="{
        base: '',
        ring: '',
        divide: 'divide-y divide-gray-200 dark:divide-gray-700',
        header: { padding: 'px-4 py-5' },
        body: {
          padding: '',
          base: 'divide-y divide-gray-200 dark:divide-gray-700',
        },
        footer: { padding: 'p-4' },
      }"
    >
      <template #header>
        <div class="flex justify-between">
          <h2
            class="font-semibold text-xl text-gray-900 dark:text-white leading-tight"
          >
            Users
          </h2>
          <UButton
            color="primary"
            variant="solid"
            label="Add User"
            @click="edit_add_user_dialog = true"
          >
            <template #leading>
              <Icon name="material-symbols:add" />
            </template>
          </UButton>
        </div>
      </template>

      <!-- Filters -->
      <div class="flex items-center justify-between gap-3 px-4 py-3">
        <UInput
          v-model="search"
          icon="i-heroicons-magnifying-glass-20-solid"
          placeholder="Search..."
        />

        <USelectMenu
          v-model="selectedStatus"
          :options="statusOptions"
          value-attribute="key"
          multiple
          placeholder="Status"
          class="w-40"
        />
      </div>

      <!-- Table -->
      <UTable
        v-model="selectedRows"
        :rows="filteredUsers"
        :columns="columns"
        :loading="table_loading"
        sort-asc-icon="i-heroicons-arrow-up"
        sort-desc-icon="i-heroicons-arrow-down"
        class="w-full"
        :ui="{
          td: { base: 'max-w-[0] truncate' },
        }"
        @select="select"
      >
        <template #status-data="{ row }">
          <span
            v-if="row.status === 'active'"
            class="text-emerald-500 font-bold uppercase"
            >{{ row.status }}</span
          >
          <span v-else class="text-orange-500 font-bold uppercase">{{
            row.status
          }}</span>
        </template>
        <template #actions-data="{ row }">
          <div class="flex gap-4">
            <UButton
              size="2xs"
              color="yellow"
              variant="outline"
              :ui="{ rounded: 'rounded-full' }"
              square
              @click.stop="
                current_user = row;
                edit_add_user_dialog = true;
              "
            >
              <template #leading>
                <Icon name="material-symbols:edit" />
              </template>
            </UButton>
            <UButton
              size="2xs"
              color="red"
              variant="outline"
              :ui="{ rounded: 'rounded-full' }"
              square
              @click.stop="
                item_id_to_delete = row.id;
                delete_user_dialog = true;
              "
            >
              <template #leading>
                <Icon name="ic:baseline-delete" />
              </template>
            </UButton>
          </div>
        </template>
      </UTable>
    </UCard>

    <!-- Add User -->
    <UModal v-model="edit_add_user_dialog">
      <UCard
        :ui="{
          ring: '',
          divide: 'divide-y divide-gray-100 dark:divide-gray-800',
        }"
      >
        <div class="flex items-center justify-between border-b pb-5">
          <h3
            class="text-base font-semibold leading-6 text-gray-900 dark:text-white"
          >
            {{ edit_mode ? "Edit User" : "Add User" }}
          </h3>
          <UButton
            color="gray"
            variant="ghost"
            icon="i-heroicons-x-mark-20-solid"
            class="-my-1"
            @click="edit_add_user_dialog = false"
          />
        </div>

        <UForm
          class="space-y-4 pt-5"
          :schema="schema"
          :state="state"
          @submit="saveUser"
          @error="onError"
        >
          <UFormGroup label="Name" name="name">
            <UInput v-model="state.name" />
          </UFormGroup>
          <UFormGroup label="Email" name="email">
            <UInput v-model="state.email" />
          </UFormGroup>
          <UFormGroup label="Status" name="status">
            <UToggle v-model="state.status" />
          </UFormGroup>

          <div class="flex items-center justify-cebter pt-5">
            <UButton :loading="save_user_loading" label="Save" type="submit" />
          </div>
        </UForm>
      </UCard>
    </UModal>

    <!-- Delete User -->
    <UModal v-model="delete_user_dialog">
      <UCard
        :ui="{
          ring: '',
          divide: 'divide-y divide-gray-100 dark:divide-gray-800',
        }"
      >
        <div class="flex items-center justify-between pb-5">
          <h3
            class="text-base font-semibold leading-6 text-gray-900 dark:text-white"
          >
            Are you sure you want to delete this user?
          </h3>
          <UButton
            color="gray"
            variant="ghost"
            icon="i-heroicons-x-mark-20-solid"
            class="-my-1"
            @click="delete_user_dialog = false"
          />
        </div>
        <div class="flex justify-center gap-3">
          <UButton
            @click="deleteUser"
            label="Delete"
            :loading="delete_loading"
          />
          <UButton
            @click="delete_user_dialog = false"
            label="Cancel"
            color="gray"
          />
        </div>
      </UCard>
    </UModal>
  </div>
</template>
