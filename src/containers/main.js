import React from 'react'
import html2canvas from 'html2canvas'
import jsPDF from 'jspdf'
import {hot} from 'react-hot-loader'
import SiderBar from '../components/siderbar'
import Footer from '../components/footer'
import Content from '../components/content'
import Navbar from '../components/navbar'
import resume from '../utils/resume'

class Main extends React.Component {
    componentDidMount() {
        const loading = document.getElementById('loading')
        loading.style.display = 'none'
    }

    renderHTMLtoPDF = () => {
        html2canvas(document.body, {
            onrendered: (canvas) => {
                const contentWidth = canvas.width
                const contentHeight = canvas.height

                //一页pdf显示html页面生成的canvas高度
                let pageHeight = contentWidth / 841.89 * 592.28

                //未生成pdf的html页面高度
                let leftHeight = contentHeight

                //页面偏移
                let position = 0

                //a4纸的尺寸[595.28,841.89]，html页面生成的canvas在pdf中图片的宽高
                const imgWidth = 841.89
                const imgHeight = 841.89 / contentWidth * contentHeight

                const pageData = canvas.toDataURL('image/jpeg', 1.0)

                const pdf = new jsPDF('l', 'pt', 'a4')

                //有两个高度需要区分，一个是html页面的实际高度，和生成pdf的页面高度(841.89)
                //当内容未超过pdf一页显示的范围，无需分页
                if (leftHeight < pageHeight) {
                    pdf.addImage(pageData, 'JPEG', 0, 0, imgWidth, imgHeight)
                } else {
                    while (leftHeight > 0) {
                        pdf.addImage(pageData, 'JPEG', 0, position, imgWidth, imgHeight)
                        leftHeight -= pageHeight
                        position -= 592.28

                        //避免添加空白页
                        if (leftHeight > 0) {
                            pdf.addPage()
                        }
                    }
                }

                pdf.save('罗丹-PHP&GO后端开发工程师.pdf')
            }
        })
    }

    render() {
        return (
            <div className="container-fluid">
                <div className="row main clearfix">
                    <Navbar renderHTMLtoPDF={this.renderHTMLtoPDF}/>
                    <SiderBar {...resume} />
                    <Content {...resume} />
                    <Footer/>
                </div>
            </div>
        )
    }
}

export default hot(module)(Main)
