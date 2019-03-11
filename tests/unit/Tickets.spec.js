//DEFUNCT
jest.mock('@/modules/axiosWrapper.js');
import { shallowMount } from "@vue/test-utils";
import Tickets from "@/components/Tickets.vue";
import wrap from "@/modules/axiosWrapper.js";
import 'jest-localstorage-mock';
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
      jest.advanceTimersByTime(10000);
      console.log(wrapper.vm.tickets)
      expect(wrapper.vm.tickets).not.toHaveLength(0);
    })
  })
  it('falls back to cached values if cannot connect to remote', () => {
    localStorage.setItem("Tickets", JSON.stringify([{ link: 1 }]))
    const wrapper = shallowMount(Tickets);
    expect(wrapper.vm.tickets).toEqual([{ link: 1 }])
  });
  it("Test axios", () => {
    const tickets = [{ title: 'test' }];
    const resp = { data: tickets };
    console.log(resp)
    wrap.get.mockResolvedValue(resp);
    expect(resp.data).toEqual(tickets)
  })
});