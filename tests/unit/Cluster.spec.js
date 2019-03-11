//Defunct
import { shallowMount } from "@vue/test-utils";
import ClusterQueue from "@/components/ClusterQueue.vue";
jest.useFakeTimers();
describe("ClusterQueue.vue", () => {
    it("pending is defined", () => {
        const wrapper = shallowMount(ClusterQueue);
        wrapper.vm.$nextTick(() => {
            jest.advanceTimersByTime(10000);
            console.log(wrapper.vm.pending)
            expect(wrapper.vm.pending).anything;
        })
    })
    it("Running is defined", () => {
        const wrapper = shallowMount(ClusterQueue);
        wrapper.vm.$nextTick(() => {
            jest.advanceTimersByTime(10000);
            console.log(wrapper.vm.running)
            expect(wrapper.vm.running).anything;
        })
    })
})