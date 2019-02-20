import { shallowMount } from "@vue/test-utils";
import Tickets from "@/components/Tickets.vue";

jest.useFakeTimers();
//jest.runAllTimers()

describe("Tickets.vue", () => {
  it("Tickets array is not empty", () => {
    const wrapper = shallowMount(Tickets);
    expect(wrapper.vm.tickets).anything;
  });
  it("Tickets array has length > 0", () => {
    const wrapper = shallowMount(Tickets);
    wrapper.vm.$nextTick(() => {

      //expect(setTimeout).toHaveBeenCalledTimes(1);
      jest.advanceTimersByTime(4000);
      expect(wrapper.vm.tickets).not.toHaveLength(0);

    })
  })

});
