/**
 * Created by jiangyukun on 2017/4/19.
 */
import {context} from '../../core/env'

export function uploadFile(file: File) {
  const form = new FormData()
  form.append('file', file)

  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest()
    xhr.open('post', context + '/file/upload', true)
    xhr.onreadystatechange = function () {
      if (xhr.readyState == 4 && xhr.status == 200) {
        const result = eval('(' + xhr.responseText + ')')
        if (result.statusCode == 0) {
          let data = result['data']
          let fileList = data.map(item => ({
            fileName: item['file_name'],
            fileType: item['file_type'],
            fileUrl: item['file_url'],
          }))
          resolve(fileList[0])
        }
        reject(result['rspMsg'])
      }
    }
    xhr.send(form)
  })
}

export function uploadFileList(files: File[]) {
  const form = new FormData()
  for (let i = 0; i < files.length; i++) {
    form.append('file', files[i])
  }

  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest()
    xhr.open('post', context + '/file/upload', true)
    xhr.onreadystatechange = function () {
      if (xhr.readyState == 4 && xhr.status == 200) {
        const result = eval('(' + xhr.responseText + ')')
        if (result.statusCode == 0) {
          let data = result['data']
          let fileList = data.map(item => ({
            fileName: item['file_name'],
            fileType: item['file_type'],
            fileUrl: item['file_url'],
          }))
          resolve(fileList)
        }
        reject(result['rspMsg'])
      }
    }
    xhr.send(form)
  })

}
