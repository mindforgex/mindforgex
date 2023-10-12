import { TableContainer } from "@chakra-ui/react";
import { Table as ChakraTable } from "@chakra-ui/react";
import Pagination from "./Pagination";
import { useAppRedireact } from "../utils/hook";

export default function Table({
  pageCount,
  onPageChange,
  tableColumns,
  data
}) {
  const _tableColumns = Array.isArray(tableColumns) ? tableColumns : []
  const _data = Array.isArray(data) ? data : []
  const [generateRouter] = useAppRedireact()

  return (
    <>
      <TableContainer>
        <ChakraTable className="cyberpress-table cyberpress-team-players">
          <thead>
            <tr>
              {
                _tableColumns.map(_item => {
                  return (
                    <th key={_item.keySelector} className={_item.className}>{_item.label}</th>
                  )
                })
              }
            </tr>
          </thead>
          <tbody>
            {_data.map(_item => {
              return (
                <tr key={_item.id} className='cursor-pointer' onClick={() => router.push(generateRouter(`/post/${_item.id}`))}>
                  {
                    _tableColumns.map((_key, index) => {
                      return (
                        <td key={_key + index}>
                          {
                            _key.render ? _key.render(_item[_key.keySelector]) : _item[_key.keySelector]
                          }
                        </td>
                      )
                    })
                  }
                </tr>
              )
            })}
          </tbody>
        </ChakraTable>
      </TableContainer>
      <Pagination pageCount={pageCount} onPageChange={onPageChange} />
    </>
  )
}