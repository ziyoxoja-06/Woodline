import {result} from "@/utils/result (3)";

const fullData ={
    btnPrecent:'',
    filterDate:'',
    deliveryDates:'',
    modalData:'',
    objectKeys: [],
    openDrag: true,
    mainData: 'bb',
    changeCalendar: '',
    month: '',
    today: '',
    calendar: {
        monthNames: ["January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December"
        ],
        days: {
            uz: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday',],
            ru: ['Понедельник ', 'Вторник ', 'Среда ', 'Четверг ', 'Пятница ', 'Суббота ', 'Воскресенье',],
        },
    },
    navKey: '',
    draggingCard: {
        key: '',
        lane: "",
        index: -1,
        cardData: {}
    },
}
const dragMethhods={
    async changeData() {
        await this.$store.dispatch('setDragAndDrop',result)
        this.mainData = await this.$store.getters['getDragAndDrop']
    },
    funk(key) {
        this.navKey = key
    },
    async handleDragStart(lane, dragResult, key, i) {
        const {payload, isSource} = dragResult
        if (isSource) {
            this.draggingCard = {
                key: key,
                lane: lane,
                index: payload.index,
                cardData: {
                    ...this.mainData.data[key][i][lane][payload.index]
                }
            }
        }
    },
    async handleDrop(lane, dropResult, key, i) {

        const {removedIndex, addedIndex} = dropResult
        if (lane === this.draggingCard.lane && removedIndex === addedIndex) {
            return;
        }
        if (removedIndex !== null) {
            this.mainData?.data[key][i][lane].splice(removedIndex, 1)
        }
        if (addedIndex !== null) {
            this.mainData?.data[key][i][lane].splice(addedIndex, 0, this.draggingCard.cardData)

            this.modalData = this.draggingCard.cardData
            this.openDrag = false
            this.today = new Date().toISOString().slice(0, 4);
            // eslint-disable-next-line
            let filterMonth = ''
            let filterDay = ''
            for (let j = 0; j < this.calendar.monthNames.length; j++) {
                // eslint-disable-next-line
                if (this.calendar.monthNames[j] === key) {
                    if ((j+1).toString().length === 2) {
                        filterMonth = (j+1)
                    } else {
                        filterMonth = ('0' + (j+1))
                    }
                }
            }
            if ((i+1).toString().length === 2) {
                filterDay =(i+1)
            } else {
                filterDay = ('0' + (i+1 ))
            }
            let deliveryDate = this.today + `-${filterMonth}` + `-${filterDay}`
            console.log(deliveryDate,'deliveryDates')
            this.deliveryDates = deliveryDate
            try {
                this.$axios.put(`/order/${this.draggingCard.cardData.order.order_id}`, {deliveryDate})
                this.mainData = await this.$store.getters['getDragAndDrop']

            } catch (err) {
                console.log(err)
            }
        }
    },
    getChildPayload(index) {
        return {
            index,
        };
    },
}

export {
    fullData,
    dragMethhods
}