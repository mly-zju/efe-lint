/**
 * @file Pagination2 extends Pagination in san-mui
 * @author malingyang@baidu.com
 */
import {Pagination} from 'san-mui';

const currentKey = 'current';
const pageSizeKey = 'pageSize';
const showSizeChangerKey = 'showSizeChanger';
const totalKey = 'total';
const pageSizeOptionsKey = 'pageSizeOptions';
const totalPageKey = 'totalPage';
const pageSizePopupOpenKey = 'pageSizePopupOpen';
const defaultPageSize = 10;
const defaultCurrent = 1;
const defaultPageSizeOption = [5, 10, 20, 50];
const pageGroupLen = 5;

export default class Pagination2 extends Pagination {

    changePageSize(pageSize) {

        let me = this;
        let oldPageSize = this.data.get(pageSizeKey);
        let oldCurrent = this.data.get(currentKey);
        let current = Math.ceil(((oldCurrent - 1) * oldPageSize + 1) / pageSize);

        this.setPageSize(pageSize);
        me.setCurrentPage2(current);

        // this.fire('pageSizeChange', {
        //     pageSize,
        //     pageNum: current
        // });

        this.toggleSelectorPopup();
    }

    setCurrentPage2(pageNum, canOverflow) {

        let current = parseInt(pageNum, 10);
        let totalPage = this.data.get(totalPageKey);

        if (canOverflow) {
            if (current > totalPage) {
                current = totalPage;
            }
            if (current < defaultCurrent) {
                current = defaultCurrent;
            }
        }

        // if (
        //     current >= defaultCurrent
        //     && current <= totalPage
        //     && current !== this.data.get(currentKey)
        // ) {
        //     this.data.set(currentKey, current);
        //     this.fire('pageChange', {
        //         pageNum: current,
        //         pageSize: this.data.get(pageSizeKey)
        //     });
        // }

        this.data.set(currentKey, current);
        this.fire('pageChange', {
            pageNum: current,
            pageSize: this.data.get(pageSizeKey)
        });
    }
}
