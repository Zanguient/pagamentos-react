import axios from 'axios';
import {toastr} from 'react-redux-toastr';
import {reset as resetForm} from 'redux-form';

import {showTabs, selectTab} from '../common/tab/tabActions';
const BASE_URL = 'http://localhost:3003/api';

export function getList() {
				const request = axios.get(`${BASE_URL}/billingCycles`);
				return {type: 'BILLING_CYCLES_FETCHED', payload: request};
}

export function create(values) {
				return (dispatch) => {
								axios
												.post(`${BASE_URL}/billingCycles`, values)
												.then((response) => {
																toastr.success('Sucesso', 'Ciclo criado com sucesso');
																dispatch([
																				resetForm('billingCycleForm'),
																				getList(),
																				selectTab('tabList'),
																				showTabs('tabList', 'tabCreate')
																]);
												})
												.catch((err) => {
																err
																				.response
																				.data
																				.errors
																				.forEach((e) => toastr.error('Erro', e));
												});
				};
}

export function showUpdate(billingCycle) {
				return [showTabs('tabUpdate'), selectTab('tabUpdate')]
}