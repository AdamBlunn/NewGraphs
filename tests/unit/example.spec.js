
import { shallowMount } from "@vue/test-utils";
import Tickets from "@/components/Tickets.vue";
import wrap from "@/modules/axiosWrapper.js";
import axios from 'axios';
import 'jest-localstorage-mock';
//jest.mock('axios');
jest.useFakeTimers();
//jest.runAllTimers()
describe("Tickets.vue", () => {
  it("Tickets array has length > 0", () => {
    wrap.get = jest.fn().mockReturnValueOnce([1, 2, 3]);

    const wrapper = shallowMount(Tickets);
    wrapper.vm.$nextTick(() => {
      jest.advanceTimersByTime(10000);
      console.log(wrapper.vm.tickets)
      expect(wrapper.vm.tickets).not.toHaveLength(0);
    })
  })
  it.only('falls back to cached values if cannot connect to remote', () => {

    localStorage.setItem("Tickets", JSON.stringify([{ link: 1 }]))
    const wrapper = shallowMount(Tickets);
    expect(wrapper.vm.tickets).toEqual([{ link: 1 }])
  });
});