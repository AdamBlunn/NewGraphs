import { shallowMount } from "@vue/test-utils";
import Licences from "@/components/Licences.vue";

jest.useFakeTimers();
//jest.runAllTimers()

describe("Licences.vue", () => {
    it("Licences array is not null, nan or undefined", () => {
        const wrapper = shallowMount(Licences);
        expect(wrapper.vm.licences).anything;
    });
    it("Licences array has length > 0", () => {
        const wrapper = shallowMount(Licences);
        wrapper.vm.$nextTick(() => {
            jest.advanceTimersByTime(4000);
            expect(wrapper.vm.licences).not.toHaveLength(0);
        })
    })

});
