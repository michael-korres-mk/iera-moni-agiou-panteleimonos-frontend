<template>
  <Notifications
    :notifications="notifications"
    @remove="removeNotification"
    @click:notification="handleNotificationClick"
  />
</template>

<script>
import useGenericEntityStore from '@/stores/entity'
import { defineStore } from 'pinia'

export default {
  
  setup() {

    const endpoint = `notifications`

    const entityStore = defineStore(
      endpoint,
      useGenericEntityStore(endpoint),
    )()

    const updateNotificationStore = defineStore(
      `${endpoint}/dismissed`,
      useGenericEntityStore(`${endpoint}/dismissed`),
    )()

    
    return {
      entityStore,
      updateNotificationStore,
    }
  },
  data() {
    return {
      notifications: [],
    }
  },
  async mounted() {
    this.getNotifications() 
    setInterval(() => {
      this.getNotifications() 
    }, 300000) // 5 minutes
  },

  methods: {
    getNotifications(searchQuery = '') {
      return this.entityStore
        .getEntities({}, searchQuery) 
        .then(response => {
          this.notifications = response.content
        })
        .catch(error => {
          console.error('Error fetching notifications:', error)
        })
    },

    handleNotificationClick(notification) {
      this.removeNotification(notification.id)
      this.redirectUrl([notification.id])
    },

    redirectUrl(notificationId) {
      notificationId.forEach(id => {
        const notification = this.notifications.find(item => item.id === id)
        if (notification && notification.url) {
          window.location.href = notification.url
        }
      })
    },
    
    removeNotification(notificationId) {
      this.notifications.forEach((item, index) => {
        if (notificationId === item.id) {
          const data = {
            id: item.id, 
          }

          this.updateNotificationStore.saveEntity(data, true)
            .then(() => {
              this.notifications.splice(index, 1)
            })
            .catch(error => {
              console.error('Error:', error)
            })
        }
      })
    },
  },
}
</script>
