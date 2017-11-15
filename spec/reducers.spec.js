import { expect } from 'chai';
import articleReducer, {initialState} from '../src/reducers/articleReducer';
import * as types from '../src/types/index';
import * as articleActions from '../src/actions/articles';

describe('article reducer', () => {
    it('exists', () => {
        expect(articleReducer).to.be.a("function");
    });
});
