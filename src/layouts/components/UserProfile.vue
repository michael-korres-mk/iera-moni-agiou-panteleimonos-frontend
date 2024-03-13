<script setup>
import { PerfectScrollbar } from 'vue3-perfect-scrollbar';
</script>

<template>
  <VBadge
    dot
    bordered
    location="bottom right"
    offset-x="3"
    offset-y="3"
    color="success"
  >
    <VAvatar
      class="cursor-pointer"
      color="primary"
      variant="tonal"
    >
      <VIcon
        size="large"
        icon=" fa-user-circle-o"
      />

      <!-- SECTION Menu -->
      <VMenu
        activator="parent"
        width="350"
        location="bottom end"
        offset="14px"
      >
        <VList>
          <VListItem>
            <template #prepend>
              <VListItemAction start>
                <VBadge
                  dot
                  location="bottom right"
                  offset-x="3"
                  offset-y="3"
                  color="success"
                  bordered
                >
                  <VIcon
                    size="large"
                    icon=" fa-user-circle-o"
                  />
                </VBadge>
                <VListItemTitle class="ms-4">
                  {{ user.title }}
                </VListItemTitle>
              </VListItemAction>
            </template>
          </VListItem>

          <PerfectScrollbar :options="{ wheelPropagation: false }">
            <VListItem 
              :to="{
                name: 'account-settings-tab',
              }"
              link
            >
              <template #prepend>
                <VIcon
                  class="me-2"
                  icon="tabler-user"
                  size="22"
                />
              </template>

              <VListItemTitle>Λογαριασμός</VListItemTitle>
            </VListItem>

            <!-- Divider -->
            <VDivider class="my-2" />

            <!-- 👉 Logout -->
            <VListItem @click="logoutUser">
              <template #prepend>
                <VIcon
                  class="me-2"
                  icon="tabler-logout"
                  size="22"
                />
              </template>

              <VListItemTitle>Αποσύνδεση</VListItemTitle>
            </VListItem>
          </PerfectScrollbar>
        </VList>
      </VMenu>
      <!-- !SECTION -->
    </VAvatar>
  </VBadge>
</template>
