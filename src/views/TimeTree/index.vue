<template >
    <div class="tree-contain">
        <div class="block tree">
            <el-timeline>
                <el-timeline-item
                        v-for="(activity, index) in activities"
                        :key="index"
                        :color="activity.color"
                        :size="activity.size"
                        :timestamp="activity.timestamp"
                        placement="top"
                >
                    <el-card style="font-size: 15px;cursor: pointer" @click.native="updataImg(index)">
                        {{ activity.content }}
                    </el-card>
                </el-timeline-item>
            </el-timeline>
        </div>
        <el-image :src="require('@/assets/img/time/'+imgNum+'.jpg')" class="image"></el-image>
    </div>
</template>

<script>
    export default {
        name: "TimeTree",
        data() {
            return {
                activities: [
                    {
                        content: '1981年，纽约市立大学的伊拉·法奇和耶鲁大学的格里登·弗里曼建立的协作大学网络，最初连接了耶鲁大学和纽约市立大学。因时网（BITNET；Because It\'s Time Network）是1980年代由美国纽约市立大学和耶鲁大学的研究者们建立的一个学术研究网络，也是今天互联网的雏形',
                        timestamp: '1981年',
                        color: '#4399FE',
                    },
                    {
                        content: '1822年查尔斯·巴贝奇概念化并发明了差分机，巴贝奇设计计算机器的基本想法是利用“机器”将计算到印刷的过程全部自动化，全面去除人为疏失（如：计算错误、抄写错误、校对错误、印制错误等）。而差分机一号（Difference Engine No.1）则是利用N次多项式求值会有共通的N次阶差的特性，以齿轮运转，带动十进制的数值相加减、进位。',
                        timestamp: '1822年',
                    },
                    {
                        content: '“超级计算机”一词第一次出现在1929年《纽约世界报》关于大型报表机的报导中，超级计算机是指信息处理能力比个人计算机快一到两个数量级以上的计算机，它在密集计算、海量数据处理等领域发挥着举足轻重的作用。作为高性能计算技术产品的超级计算机，又称巨型机，是与高性能计算机或高端计算机相对应的概念。',
                        timestamp: '1929年',
                        color: '#4399FE',
                    },
                    {
                        content: '1946年2月14日：世界上第一台通用计算机ENIAC诞生，发明者莫克利和艾克特均为美国人，其初衷也是美国奥伯丁武器试验场为了满足计算弹道需要而研制的。',
                        timestamp: '1946年2月14日',
                    },
                    {
                        content: '1946年7月8日摩尔学院举行讲座，掀起了计算机制造活动的热潮。宾夕法尼亚大学摩尔电气工程学院的一所鼓舞人心的暑期学校在美国，法国，英国和德国的大学和研究机构中促进了存储程序计算机的构建。讲师中有早期的计算机设计师，George Stibitz和Douglas Hartree在内的数学家。学生包括诸如Maurice Wilkes，Claude Shannon，David Rees和Jay Forrester等未来的计算机先驱。这套公开的免费讲座启发了EDSAC，BINAC和后来的AVIDAC等IAS机器克隆。',
                        timestamp: '1946年7月8日',
                        color: '#4399FE',
                    },
                    {
                        content: '1947年，计算机科学协会（ACM）成立，是世界第一个科学性及教育性计算机学会。计算机科学协会(Association for Computing Machinery , 简称ACM)是世界上最大的计算机领域专业性学术组织，汇集了国际计算机领域教育家，研究人员，工业界人士及学生。 兴趣小组每年亦会在全世界（但主要在美国）举办世界性讲座及会谈，以供各会员分享他们的研究成果。ACM以强大的组织架构，极高的技术规范，以及对技术创新的认同，作为其重要发展准则。',
                        timestamp: '1947年',
                    },
                    {
                        content: '1947年9月9日葛丽丝·霍普（Grace Hopper）发现了计算机史上第一只程序“Bug”，Bug一词指在电脑系统或程序中，隐藏着的一些未被发现的缺陷或问题。但是Bug一词是如何由来的呢?这一切起源于1947年，从一只不小飞入Mark II计算机的飞虫说起。',
                        timestamp: '1947年9月9日',
                        color: '#4399FE',
                    },
                    {
                        content: '1949年5月IBM 卡片编程电子计算器（IBM CPC）发布，IBM 卡片编程电子计算器(CPC)于 1949年 5月推出，作为一种通用的多用途计算机，它是美国空间计划使用的第一台数字式计算机。',
                        timestamp: '1949年5月',
                    },
                    {
                        content: '1949年 CSIRAC 运行了第一个测试程序，是澳大利亚第一台计算机，CSIRAC是澳大利亚在1949年11月制造出来的第一台数字电脑，也是幸存的还能运行的最古老的第一代电子计算机，目前储存在澳大利亚墨尔本博物馆。',
                        timestamp: '1949年',
                        color: '#4399FE',
                    },
                    {
                        content: '1949年，磁滚筒数字微分分析器（MADDIDA）面市，MADDIDA（磁滚筒数字微分分析器）是一个特殊用途的数字计算机用于解决的系统常微分方程。这是第一台使用电压电平表示位的计算机，其整个逻辑在布尔代数中指定。',
                        timestamp: '1949年',
                    },
                    {
                        content: '1949年澳大利亚的第一台计算机CSIRAC开始运行，澳大利亚的第一台计算机CSIRAC于1949年开始运行。首席程序员Geoff Hill来自一个音乐世家，在第一届澳大利亚自动计算机大会上展示CSIRAC的准备工作的一部分。',
                        timestamp: '1949年',
                        color: '#4399FE',
                    },
                    {
                        content: '1950年代后期，美军开始使用叫（Semi-Automatic Ground Environment）的指挥系统，其为最早的计算机网络',
                        timestamp: '1950年代后期',
                    },
                    {
                        content: '1950年6月电子计算机——SEAC投入使用，东部标准自动计算机（SEAC）是美国最早完成的存储程序计算机之一。它建在华盛顿特区，作为评估组件和系统以及设定计算机标准的测试平台。它也是第一批使用全二极管逻辑的计算机之一，该技术比真空管更可靠。1957年，工程师Russell Kirsch在SEAC上制作了世界上第一个扫描的图像。',
                        timestamp: '1950年6月',
                        color: '#4399FE',
                    },
                    {
                        content: '1950年 Simon computer 诞生，是全球第一台PC，西蒙是基于中继的计算机，自1950年10月起，埃德蒙·伯克利（Edmund Berkeley）在《无线电电子》杂志的13篇建筑文章中对此进行了描述。出于演示数字计算机概念的教育目的，它无法用于任何重要的领域。',
                        timestamp: '1950年',
                    },
                    {
                        content: '1950年美国建造了电子计算机——SWAC，国家统计局还在UCLA校园的数值分析研究所建造了标准西方自动计算机（SWAC）。SWAC并不是使用SEAC之类的组件进行测试，而是使用已开发的技术构建的。SWAC用于解决数值分析中的问题，包括开发气候模型和发现五个以前未知的梅森素数。',
                        timestamp: '1950年',
                        color: '#4399FE',
                    },
                    {
                        content: '1951年由Ferranti设计与制作的计算机Nimrod在不列颠的科学展上展出，在5月5日的不列颠节上，于伦敦科学馆展示了Nimrod电脑，其使用灯光阵列面板做显示。这款电脑是为游玩游戏《Nim》而专门设计的，他成为有记载的，最早专门设计用来游戏的数字计算机。Nimrod可以游玩原版与“反转”版的游戏。',
                        timestamp: '1951年5月5日',
                    },
                    {
                        content: '1956年3月，闵乃大、胡世华、徐献瑜、张效祥、吴几康等组成代表团参加在莫斯科办的“计算技术发展道路”国际会议,回国后在中国科学院成立计算技术、半导体、电子学及自动化等四个研究所。',
                        timestamp: '1956年3月',
                        color: '#4399FE',
                    },
                    {
                        content: '中国科学院计算技术研究所创建于1956年，是中国第一个专门从事计算机科学技术综合性研究的学术机构。',
                        timestamp: '1956年',
                    },
                    {
                        content: '1958年8月，上海市长途电话局陈奕匡、张礼修等参考引进的苏联设备，制成“八一”型12路载波机；同年，邮电部上海器材厂何球、袁应龙、喻伯嘉、王惠琪、杨其干等研制出312-I型12路载波终端机样机。 除此以外，还有杭州的“东风”、北京的“银河”、广州的“越秀”、四川的“峨嵋”等型号先后问世。',
                        timestamp: '1958年8月',
                        color: '#4399FE',
                    },
                    {
                        content: '1959年，维克托·米哈伊洛维奇·格卢什科夫向苏联共产党中央委员会提出一个详细的计划——其目标是创建全国性的网络中心OGAS，以重整对苏联武装力量及经济的控制。',
                        timestamp: '1959年',
                    },
                    {
                        content: '1960年，商业航空预订系统-SABRE上线，其连接了两台大型计算机，现在其成为了全球性旅游业技术解决方案商。',
                        timestamp: '1960年',
                        color: '#4399FE',
                    },
                    {
                        content: '在1960年代间，保罗·巴兰及唐纳德·戴维斯各自提出了分组交换的概念，以把信息透过网络在电脑之间传输。戴维斯率先把NPL网络的概念在现实中实现。它是一个位于英国国家物理实验室，线路速度为768kbit/s的局域网。',
                        timestamp: '1960年代',
                    },

                    {
                        content: 'ARPANET是最早的计算机网络之一，其想法是由Leonard Kleinrock于1961年在其题为 "大型通信网的信息流 "的论文中提出的。',
                        timestamp: '1961年',
                        color: '#4399FE',
                    },
                    {
                        content: '1963年，J·C·R·利克莱德向他的同事发送了一份备忘录，于当中探讨“星系间计算网络”这一概念，即可用于一般用户通信的电脑网络。',
                        timestamp: '1963年',
                    },
                    {
                        content: '1964年，达特茅斯学院的研究者开发出达特茅斯分时系统，以使大型机系统的用户分流。',
                        timestamp: '1964年',
                        color: '#4399FE',
                    },
                    {
                        content: '1964年4月7日，在IBM公司成立五十周年之际，由年仅四十岁的吉恩·阿姆达尔（Gene Amdahl）担任主设计师，历时四年研发的IBM360计算机问世，是IBM历史上最成功的机型之一。 IBM360是一款划时代的产品，标志着第三代计算机——集成电路计算机的全面登场，是世界上首个指令集可兼容计算机。',
                        timestamp: '1964年4月7日',
                    },
                    {
                        content: '1964年，大西洋月刊发表了一篇题为《The Computers of Tomorrow（明日计算机）》的文章，详细分析了公共计算服务与公共电网的异同点。',
                        timestamp: '1964年',
                        color: '#4399FE',
                    },
                    {
                        content: '1965年，经过7年的发展，贝尔实验室和Western Electric推出了1A1公用电话。 1A1单插槽型号取代了标准的三插槽付费电话设计，是自1920年代以来投币式电话的首次重大变化。',
                        timestamp: '1965年',
                    },
                    {
                        content: 'Donald Davies在1965年提出“ packet ”一词，用于描述通过网络在计算机之间发送的数据。',
                        timestamp: '1965年',
                        color: '#4399FE',
                    },
                    {
                        content: '1966年，托马斯·马里尔及劳伦斯·罗伯茨发表了一篇论文，其内容有关一个用于电脑分时的试验性广域网',
                        timestamp: '1966年',
                    },
                    {
                        content: 'ARPANET是最早使用分组交换的计算机网络之一。ARPANET的开发始于1966年，最早的两个节点UCLA和SRI（斯坦福研究所）被连接起来，于1969年正式启动ARPANET。',
                        timestamp: '1969年',
                        color: '#4399FE',

                    },
                    {
                        content: '第一个RFC出现在1969年4月，是一份定义和提供计算机通信、网络协议和程序信息的文件。',
                        timestamp: '1969年4月',
                    },
                    {
                        content: '1969年8月29日，第一个网络交换机和IMP（界面信息处理器）被送到加州大学洛杉矶分校。它被用来在ARPANET上发送第一个数据传输。',
                        timestamp: '1969年8月29日',
                        color: '#4399FE',
                    },
                    {
                        content: '互联网正式诞生，1969年10月29日晚上10点30分，加州大学洛杉矶分校和SRI之间发出了第一份数据传输。',
                        timestamp: '1969年10月29日',
                    },
                    {
                        content: 'Datapoint 2200是1970年全球首批投放市场的终端用户电脑之一。该产品制造商为Computer Terminal Corp.(CTC),但该公司如今已不复存在。但Datapoint 2200的很多基本理念仍保留在我们今天所使用的个人电脑当中。如CTC曾向当时尚为创业公司的英特尔提出建议：尽量采用单一芯片，以减少机器的发热量。 凭借此建议，英特尔一步步登上了PC处理器领域霸主的地位。',
                        timestamp: '1970年',
                        color: '#4399FE',
                    },
                    {
                        content: '1970 - 1980年代，Seymour Cray创立自己的公司──Cray Research。凭着他的新设计，Cray Research一度主导了当时的整个超级计算机市场。巅峰之后，其后Cray公司急速下滑；经历了破产、被收购等一系列变故，命运多舛、但仍然顽强的坚持着；直至今日，Cray依然是超级计算机领域的巨头之一。',
                        timestamp: '1970 - 1980年代',
                    },
                    {
                        content: 'Steve Crocker和UCLA的一个团队于1970年发布了NCP，这是一种用于NetWare的文件共享协议。',
                        timestamp: '1970年',
                        color: '#4399FE',
                    },
                    {
                        content: '雷·汤姆林森（Ray Tomlinson）于1971年发送了第一封电子邮件。',
                        timestamp: '1971年',
                    },
                    {
                        content: '1971年，夏威夷使用ULO无线分组网络ALOHAnet将岛屿连接在一起，尽管它不是Wi-Fi，但它为Wi-Fi奠定了基础。',
                        timestamp: '1971年',
                        color: '#4399FE',
                    },
                    {
                        content: '1972年，使用X.25的商业服务经已投入运作，其于后来成为了TCP/IP网络的基础.',
                        timestamp: '1972年',
                    },
                    {
                        content: '由ARPA于1973年部署的第一个国际网络连接称为SATNET。',
                        timestamp: '1973年',
                        color: '#4399FE',
                    },
                    {
                        content: '1973年进行了VoIP实验电话，正式引入了VoIP技术和功能。但是，直到1995年，第一个允许用户拨打VoIP的软件才问世。',
                        timestamp: '1973年',
                    },
                    {
                        content: 'CYCLADES计算机网络是1970年代初创建的法国研究网络。 它是试验分组交换概念的先驱网络之一，并且与ARPANET不同，它是专门为促进互联网络而设计的。',
                        timestamp: '1973年',
                        color: '#4399FE',
                    },
                    {
                        content: 'Ethernet由Robert Metcalfe于1973年在Xerox PARC工作时开发。',
                        timestamp: '1973年',
                    },
                    {
                        content: '1974年在Xerox使用了第一批路由器，但是这些路由器未被认为是真正的IP routers。',
                        timestamp: '1974年',
                        color: '#4399FE',
                    },
                    {
                        content: '1974年，文顿·瑟夫等人写出了首个TCP的规格RFC 675（Internet传输控制程序的规范），他们在当中首次把“Internet”视作互联网络的简写。',
                        timestamp: '1974年12月',
                    },
                    {
                        content: 'Ginny Strazisar于1976年开发了第一台真正的IP路由器，最初称为网关。',
                        timestamp: '1976年',
                        color: '#4399FE',
                    },
                    {
                        content: '1976年，Datapoint Corporation的约翰·墨菲开发了ARCNET，第一个用于共享存储设备的令牌传递网络。',
                        timestamp: '1976年',

                    },
                    {
                        content: '1977年，施乐公司的Robert Metcalfe和Yogen Dalal开发了Xerox Network Systems（XNS）。',
                        timestamp: '1977年',
                        color: '#4399FE',

                    },
                    {
                        content: 'DJS-050微型计算机是中国最早研制生产的8位微型计算机，1977年4月，清华大学、安徽无线电厂和电子部6所组成联合设计组，研制成功DJS-050微型计算机。',
                        timestamp: '1977年4月23日',

                    },
                    {
                        content: '1977年，尼克劳斯·维尔特 Niklaus Wirth开发了Diser Lilith电脑,DISER Lilith是基于AMD 2901位片处理器的计算机，具有四个硬件组件：系统单元，视频显示器，键盘和鼠标。Lilith是全球首批具有高分辨率图形显示和鼠标的计算机工作站之一。',
                        timestamp: '1977年',
                        color: '#4399FE',

                    },
                    {
                        content: '鲍勃·卡恩（Bob Kahn）于1978年在Vint Cerf的帮助下发明了TCP / IP协议并进行了开发。',
                        timestamp: '1978年',

                    },{
                        content: '1976 年，Ron Crane, Bob Garner, and Roy Ogus将以太网升级到 10 Mbps。这种更快的设计很快成为事实上的网络标准。它于 1980 年 9 月由由 DEC、英特尔和施乐组成的行业联合体 DIX 出版。',
                        timestamp: '1976 年',
                        color: '#4399FE',

                    },
                    {
                        content: '1980年WordPerfect由Satellite Software International（SSI）开发,WordPerfect是一款文字处理器，类似于Microsoft Word。WordPerfect的第一个版本由Satellite Software International（SSI）在1980年开发。在最初期，WordPerfect能够运行在各式各样的电脑和操作系统上，包括Data General，IBM PC，Apple II，VAX/VMS，Amiga，Atari ST，IBM System 370，OS/2，NeXT以及DOS，Unix，Macintosh，Windows，Linux[1]。',
                        timestamp: '1980年',

                    },
                    {
                        content: 'BITNET创建于1981年，是美国IBM大型机系统之间的网络。',
                        timestamp: '1981年',
                        color: '#4399FE',

                    },
                    {
                        content: '1981年，美国国家科学基金会开发了CSNET（计算机科学网络）。',
                        timestamp: '1981年',

                    },
                    {
                        content: 'Internet协议版本4或IPv4在1981年的RFC 791中正式被定义，IPv4是Internet协议的第一个主要版本。',
                        timestamp: '1981年',
                        color: '#4399FE',

                    },
                    {
                        content: '1981年12月1日，艾康电脑公司为BBC公司设计了BBC Micro,BBC Micro是由艾康电脑公司为BBC公司的计算机认知计划（Computer Literacy Project）设计和生产的电脑，冠以BBC品牌销售。',
                        timestamp: '1981年12月1日',
                    },
                    {
                        content: 'Paul Mockapetris和Jon Postel在1983年实现了第一个DNS。',
                        timestamp: '1983年',
                        color: '#4399FE',
                    },
                    {
                        content: '1983年8月“五笔字型”汉字编码方案通过鉴定。该输入法后来成为专业录入人员使用最多的输入法。',
                        timestamp: '1983年8月',
                    },
                    {
                        content: '1983年，ARPANET完成了向使用TCP / IP的过渡。',
                        timestamp: '1983年',
                        color: '#4399FE',
                    },
                    {
                        content: '1983年12月22日，中国第一台每秒钟运算一亿次以上的“银河”巨型计算机，由国防科技大学计算机研究所在长沙研制成功。它填补了国内巨型计算机的空白，中国成为继美国、日本之后，第三个能独立设计和制造巨型计算机的国家。标志着中国进入了世界研制巨型计算机的行列。',
                        timestamp: '1983年12月22日',
                    },
                    {
                        content: '1984年2月16日，在上海的微电子技术应用汇报展览会上，时任中央军委主席邓小平观看了由少年宫学生李劲制作的电脑动画程序，并提出：“计算机的普及要从娃娃做起”（被广泛误传为“从娃娃抓起”）从此成为中国计算机教育普及的开端。',
                        timestamp: '1984年2月16日',
                        color: '#4399FE',
                    },
                    {
                        content: '长城0520CH电脑长城0520CH电脑是中国第一台中文化、工业化、规模化生产的微型计算机。1984年6月研制成功，同年6月在全国计算机应用展览会上正式发布。',
                        timestamp: '1984年6月',
                    },
                    {
                        content: '1985年4月至6月间 Atari 520ST限量发行,雅达利ST是一款家用与个人用电脑，在1985年至1990年代早期是非常成功的产品。依雅达利公司的正式说明，是第一个具有彩色图形使用者界面的电脑。',
                        timestamp: '1985年',
                        color: '#4399FE',
                    },
                    {
                        content: 'NSFNET（国家科学基金网络）于1986年上线，在20世纪90年代初ARPANET被最终取代之前，它是ARPANET的核心。',
                        timestamp: '1986年',
                    },
                    {
                        content: 'BITNET II创建于1986年，旨在解决原始BITNET的带宽问题。',
                        timestamp: '1986年',
                        color: '#4399FE',
                    },
                    {
                        content: 'Master Compact于1986年9月推出。它与Master系列的其余部分完全不同，Master系列具有2盒设计（如果算上显示器，则为3），就像现代PC一样。但是，实际上，系统单元实际上只是光盘驱动器/显示器支架，而主板在键盘下面！光盘单元仅包含3.5英寸驱动器和电源。',
                        timestamp: '1986年9月',
                    },
                    {
                        content: '1988年，第一个T1主干被添加到ARPANET。',
                        timestamp: '1988年',
                        color: '#4399FE',
                    },
                    {
                        content: 'AT＆T，Lucent和NCR于1988年将WaveLAN网络技术作为Wi-Fi的正式先驱引入市场。',
                        timestamp: '1988年',
                    },
                    {
                        content: '有关网络防火墙技术的详细信息于1988年首次发布，已发表的论文讨论了由Digital Equipment Corporation同年开发的第一个防火墙，称为数据包筛选器防火墙。',
                        timestamp: '1988年',
                        color: '#4399FE',
                    },
                    {
                        content: '金山软件创建于1988年，次年7月金山公司的WPS软件问世，这是中国第一个中文字处理系统。',
                        timestamp: '1988年',
                    },
                    {
                        content: '美国网络硬件公司Kalpana在1990年开发并推出了第一台网络交换机。',
                        timestamp: '1990年',
                        color: '#4399FE',
                    },
                    {
                        content: '1991年9月，沃达丰集团（Vodafone Group plc）成立，沃达丰集团（Vodafone Group plc）又音译为伏得风或伏特风，是英国一家跨国电信公司，其总部位于英国伦敦。目前主要在亚洲，非洲，欧洲和大洋洲地区提供服务。现时为世界上最大的移动通讯网络公司之一，在全球27个国家均有投资。在另外14个国家则与当地的移动电话营办商合作，联营移动电话网络。',
                        timestamp: '1991年9月',
                    },
                    {
                        content: '1992年11月19日，由国防科技大学研制的“银河—Ⅱ”10亿次巨型计算机在长沙通过国家鉴定，每秒运算10亿次，使中国成为当今世界少数几个能发布中期数值预报的国家，为国家经济建设作出了特殊的贡献。',
                        timestamp: '1992年11月19日',
                        color: '#4399FE',
                    },
                    {
                        content: '历史上第一台32位家庭游戏机FM Towns Marty在1993年2月20日发布，FM Towns Marty 是世界上第一款32位游戏机。但它介于计算机和电脑之间。 可以通用FM Towns 电脑的大部分软件。 所以它的市场定位虽然是游戏机。 但实际上这部机器游离于电脑和游戏机之间。它即可以说是游戏机，也可以说是电脑。',
                        timestamp: '1993年2月20日',
                    },
                    {
                        content: '1993年4月30日，PCI 2.0标准发布，第一次创建了连接器与主板插槽间的标准。PCI标准的开发于1990年前后开始于英特尔。1992年6月22日，英特尔发表PCI 1.0标准，该标准仅限于组件级规范。1993年4月30日，PCI-SIG发表了PCI 2.0标准，这个标准第一次创建了连接器与主板插槽间的标准。',
                        timestamp: '1993年4月30日',
                        color: '#4399FE',
                    },
                    {
                        content: '1993年，Acorn开始销售 Acorn Pocket Book 系列廉价电脑，Acorn于1992年推出了PocketBook。PocketBook是Psion 3的OEM版本。主要区别在于内置应用程序以及Acorn徽标。 该袖珍书是专为学校使用而设计的，可通过特殊链接和自动转换常见文件格式的软件链接到Acorn，Mac或Windows计算机。 Pocket Book可以运行Psion Series 3软件，因此有大量可用的应用程序。',
                        timestamp: '1993年',
                    },
                    {
                        content: '1989年8月，中国科学院承担了国家计委立项的“中关村教育与科研示范网络”（NCFC）——中国科技网（CSTNET）前身的建设。1994年4月，NCFC率先与美国NSFNET直接互联，实现了中国与Internet全功能网络连接，标志着我国最早的国际互联网络的诞生。1995年12月，中国科学院百所联网工程完成，1996年2月，中国科学院决定正式将以NCFC为基础发展起来的中国科学院院网（CASNET）命名为“中国科技网”（CSTNET）。',
                        timestamp: '1994年4月',
                        color: '#4399FE',
                    },
                    {
                        content: '1994年5月21日，在钱天白教授和德国卡尔斯鲁厄大学的协助下，中国科学院计算机网络信息中心完成了中国国家顶级域名(CN)服务器的设置，改变了中国的CN顶级域名服务器一直放在国外的历史。由钱天白、钱华林分别担任中国CN 域名的行政联络员和技术联络员。',
                        timestamp: '1994年5月21日',
                    },
                    {
                        content: '1994年7月，“中国教育和科研计算机网”采用IP/x.25技术，连接北京、上海、广州、南京、西安等五所城市，并通过NCFC的国际出口与Internet互联，成为运行TCP/IP协议的计算机互联网络',
                        timestamp: '1994年7月',
                        color: '#4399FE',
                    },
                    {
                        content: '1994年，爱立信发展出蓝牙（Bluetooth）,1998年首次推出规范0.7。蓝牙（英语：Bluetooth），一种无线通讯技术标准，用来让固定与移动设备，在短距离间交换资料，以形成个人局域网（PAN）。 1994年由电信商爱立信（Ericsson）发展出这个技术。',
                        timestamp: '1994年',
                    },
                    {
                        content: '1994年12月15日Netscape NavigatorWeb浏览器初始运行。Netscape Navigator是专有的 Web浏览器，也是Netscape系列的原始浏览器，版本1至4.08和9.x。这是网景通信公司旗舰产品，是在以下方面占主导地位的网络浏览器使用份额在20世纪90年代，但在2003年左右的使用几乎消失。这主要是由于增加了使用微软的Internet Explorer的网络浏览器软件，部分是因为Netscape公司（后来被收购AOL）不支持Netscape Navigator中的技术创新，在90年代末。',
                        timestamp: '1994年12月15日',
                        color: '#4399FE',
                    },
                    {
                        content: 'Opera是由Opera软件开发的互联网浏览器，于1995年4月1日首次发布。',
                        timestamp: '1995年4月1日',
                    },
                    {
                        content: '1955年约翰·麦卡锡第一次提出了“Utility Computing”的概念。“云计算”的粗略概念在1955年就已经由，约翰·麦卡锡教授提出粗略的概念，为后期云计算的萌芽奠定了坚实的基础。',
                        timestamp: '1955年',
                        color: '#4399FE',
                    },
                    {
                        content: '1960年代计算机程序以6位数字来存储时间，引发“千年虫”问题。千年虫（Y2K）问题，是指由于计算机程序设计的一些问题，使得计算机在处理2000年1月1日以后的日期和时间时，可能会出现不正确的操作，从而可能导致一些敏感的工业部门（比如电力，能源）和银行，政府等部门在2000年1月1日零点工作停顿甚至是发生灾难性的结果。',
                        timestamp: '1960年',
                    },
                    {
                        content: '1988年希望公司发布超级组合式中文平台UCDOS。此后，该软件一度成为我国DOS平台市场份额最大的中文操作系统。',
                        timestamp: '1988年',
                        color: '#4399FE',
                    },
                    {
                        content: 'IPv6于1996年推出，是对IPv4的改进，包括更广泛的IP地址，改进的路由和嵌入式加密。',
                        timestamp: '1996年',
                    },
                    {
                        content: '1996年Compaq公司在其公司的内部文件中，首次提及“云计算”这个词汇。1984年，SUN公司联合创始人John Gage（约翰·盖奇）提出 “网络就是计算机（The Network is the Computer）”的重要猜想，用于描述分布式计算技术带来的新世界。云计算，其实就是分布式计算的一种。',
                        timestamp: '1996年',
                        color: '#4399FE',
                    },
                    {
                        content: '1997年6月19日，由国防科技大学计算机研究所研制的银河—Ⅲ百亿次巨型计算机系统通过国家技术鉴定。它标志着中国高性能巨型机研制技术取得新突破：运算速度每秒达到百亿次，具备了研制更高性能巨型机的能力。',
                        timestamp: '1997年6月19日',
                    },
                    {
                        content: '用于Wi-Fi的802.11标准第一版于1997年6月推出，可提供最快2 Mbps的传输速度。',
                        timestamp: '1997年6月',
                        color: '#4399FE',
                    },
                    {
                        content: '3dfx公司于1998年推出NVIDIA SLI技术。SLI，全称为“可扩展的链接接口”（Scalable Link Interface），中文简称速力，是一种可把两张或以上的显卡连在一起，作单一输出使用的技术，从而达至绘图处理性能加强的效果。该技术最初被称为Scan Line Interleave，于1998年由3dfx公司推出，应用在Voodoo 2绘图处理器上。至2004年，3dfx的收购者NVIDIA再次推出此技术，应用在以PCI Express为基础的电脑上。',
                        timestamp: '1998年',
                    },
                    {
                        content: 'Wi-Fi的802.11a标准于1999年正式发布，旨在使用5GHz频带并提供最快25Mbps的传输速度。',
                        timestamp: '1999年',
                        color: '#4399FE',
                    },
                    {
                        content: '802.11b协议从1999年中期开始向公众提供，其传输速度最高11 Mbps。',
                        timestamp: '1999年',
                    },
                    {
                        content: '1999年5月20日，索尼、爱立信等六家公司组成蓝牙技术联盟（SIG）。蓝牙技术联盟（英语：Bluetooth Special Interest Group，缩写为SIG），是一个以制定蓝牙规范，与推动蓝牙技术为宗旨的国际组织。它拥有蓝牙的商标，认证并授权制造厂商使用蓝牙技术与蓝牙标志，但本身不负责蓝牙装置的设计、生产及贩售。',
                        timestamp: '1999年5月20日',
                        color: '#4399FE',
                    },
                    {
                        content: 'Wi-Fi 的WEP加密协议于1999年9月推出。',
                        timestamp: '1999年9月',
                    },
                    {
                        content: '1999年Salesforce公司由俄罗斯裔美国人马克·贝尼奥夫创办。Salesforce.com（Salesforce.com, Inc.）Salesforce公司于1999年由当时37岁的甲骨文（Oracle）高级副总裁，俄罗斯裔美国人马克·贝尼奥夫（Marc Benioff，1964/09/25-）创办，是一个以提供个人化需求进行客户关系管理规划和服务的互联网企业，总部位于美国加利福尼亚州旧金山。',
                        timestamp: '1999年',
                        color: '#4399FE',
                    },
                    {
                        content: '1999年11月2日中软总公司在京正式推出具有自主版权的高端操作系统COSIX64V5.0，这也是国内第一个具有完整商品化形态、达到成熟应用水平的操作系统。',
                        timestamp: '1999年11月2日',
                    },
                    {
                        content: '2000年1月 The Iconfactory 公司成立。The Iconfactory是一家小型软件与图像设计公司，专于制作图标与用来制作及使用图标的软件。The Iconfactory透过提供免费下载的图标套装作品而获得知名度，并迅速地发展为商业图标设计的领导公司之一。The Iconfactory亦有发行制作、组织与使用图标的软件以及一般的图形用户界面应用程序。',
                        timestamp: '2000年1月',
                        color: '#4399FE',
                    },
                    {
                        content: '2000年3月17日信息产业部和国家质量技术监督局联合发布 GB18030编码标准。GB 18030，全称《信息技术 中文编码字符集》，是中华人民共和国国家标准所规定的变长多字节字符集。其对GB 2312-1980完全向后兼容，与GBK基本向后兼容，并支持Unicode（GB 13000）的所有码位。GB 18030共收录汉字70,244个。',
                        timestamp: '2000年3月17日',
                    },
                    {
                        content: '802.11g于2003年1月开始向公众提供，其传输速度最高20 Mbps。',
                        timestamp: '2003年1月',
                        color: '#4399FE',
                    },
                    {
                        content: 'Wi-Fi用于802.11g的WPA加密协议于2003年推出。',
                        timestamp: '2003年',
                    },
                    {
                        content: '2003年5月LinkedIn启动营运。LinkedIn，中文名为领英，是一款近似Facebook的社交网络。完成注册后会自动产生和带入电子名片。专门为商业人士设立。',
                        timestamp: '2003年5月',
                        color: '#4399FE',
                    },
                    {
                        content: '作为WPA的改进和替代，2004年推出了WPA2加密协议，所有Wi-Fi设备必须在2006年通过WPA2认证。',
                        timestamp: '2004年',
                    },
                    {
                        content: '2004年12月23日，我国国家顶级域名.CN 服务器的IPv6地址成功登录到全球域名根服务器，标志着CN 域名服务器接入IPv6网络，支持IPv6网络用户的CN 域名解析，这表明我国国家域名系统进入下一代互联网。',
                        timestamp: '2004年12月23日',
                        color: '#4399FE',
                    },
                    {
                        content: '2006年，亚马逊推出了S3（Simple Storage Service，简单存储服务）和EC2（Elastic Cloud Computer，弹性云计算），奠定了自家云计算服务的基石',
                        timestamp: '2006年',
                    },
                    {
                        content: '2006年3月14日亚马逊公司推Amazon S3（简易存储服务器）。Amazon S3(Simple Storage Service)是Amazon Web Services在2006年3月推出的在线存储服务。开发人员可以使用它存储数字资产，包括图片、视频、音乐和文档。 Amazon S3是基于软件即服务（Software as a Service，SaaS）的一种云储存服务，使用 S3 时，它就像一个位于 Internet 的机器，有一个包含数字资产的硬盘驱动。',
                        timestamp: '2006年3月14日',
                        color: '#4399FE',
                    },
                    {
                        content: '2006年8月25日Amazon发布EC2受限公众Beta版本。亚马逊弹性云计算（Amazon Elastic Compute Cloud，简称Amazon EC2） ，是由亚马逊公司提供的Web服务，是一个让用户可以租用云端电脑运行所需应用的系统。EC2借由提供Web服务的方式让用户可以弹性地运行自己的Amazon机器映像档，用户将可以在这个虚拟机上运行任何自己想要的软件或应用程序。',
                        timestamp: '2006年8月25日',
                    },
                    {
                        content: '2006年，Google发布了引爆大数据时代的三大论文之三《Bigtable: A Distributed Storage System for Structured Data》，讲述了用于存储和管理结构化数据的分布式存储系统，其建立在GFS、MapReduce等基础之上。该论文启发了后期的很多的NoSQL数据库，包括Cassandra、HBase等。',
                        timestamp: '2006年',
                        color: '#4399FE',
                    },
                    {
                        content: '2007年10月，Google与IBM开始在美国大学校园，包括卡内基美隆大学、麻省理工学院、斯坦福大学、加州大学柏克莱分校及马里兰大学等，推广云计算的 计划，这项计划希望能降低分布式计算技术在学术研究方面的成本，并为这些大学提供相关的软硬件设备及技术支持（包括数百台个人电脑及BladeCenter与System x服务器，这些计算平台将提供1600个处理器，支持包括Linux、Xen、Hadoop等开放源代码平台）。而学生则可以透过网络开发各项以大规模计算为基础的研究计划。',
                        timestamp: '2007年10月',
                    },
                    {
                        content: '2008年11月，IBM的Roadrunner成为当时最快的超级计算机，运算能力为1.105PFlops。2013年3月，洛萨拉摩斯国家实验室宣布Roadrunner退役，并将于3月31日关闭。',
                        timestamp: '2008年11月',
                        color: '#4399FE',
                    },
                    {
                        content: '2008年2月GitHub正式上线。GitHub是通过Git进行版本控制的软件源代码托管服务平台，由GitHub公司（曾称Logical Awesome）的开发者Chris Wanstrath、PJ Hyett和Tom Preston-Werner使用Ruby on Rails编写而成。',
                        timestamp: '2008年2月',
                    },
                    {
                        content: 'Wi-Fi的802.11n标准于2009年正式发布,它提供了比802.11a和802.11g更高的传输速度，并且可以在2.4 GHz和5 GHz带宽上运行。',
                        timestamp: '2009年',
                        color: '#4399FE',
                    },
                    {
                        content: '2009年2月由阿里云自主研发的飞天操作系统诞生。飞天（Apsara）是由阿里云自主研发、服务全球的超大规模通用计算操作系统。 它可以将遍布全球的百万级服务器连成一台超级计算机，以在线公共服务的方式为社会提供计算能力。 从PC互联网到移动互联网到万物互联网，互联网成为世界新的基础设施。飞天希望解决人类计算的规模、效率和安全问题。飞天的革命性在于将云计算的三个方向整合起来：提供足够强大的计算能力，提供通用的计算能力，提供普惠的计算能力。 飞天诞生于2009年2月，为全球200多个国家和地区的创新创业企业、政府、机构等提供服务。',
                        timestamp: '2009年2月',
                    },
                    {
                        content: '2009年Heroku 推出第一款公有云 PaaS（Platform-as-a-Service）。平台即服务（PaaS）或应用程序平台即服务（aPaaS）或基于平台的服务是一类云计算服务，它提供了一个平台，使客户可以开发，运行和管理应用程序，而无需构建和维护该应用程序。通常与开发和启动应用程序相关的基础架构。',
                        timestamp: '2009年',
                        color: '#4399FE',
                    },
                    {
                        content: '阿里云创立于2009年，是全球领先的云计算及人工智能科技公司，致力于以在线公共服务的方式，提供安全、可靠的计算和数据处理能力，让计算和人工智能成为普惠科技。阿里云服务着制造、金融、政务、交通、医疗、电信、能源等众多领域的领军企业，包括中国联通、12306、中石化、中石油、飞利浦、华大基因等大型企业客户，以及微博、知乎、锤子科技等明星互联网公司。在天猫双11全球狂欢节、12306春运购票等极富挑战的应用场景中，阿里云保持着良好的运行纪录。',
                        timestamp: '2009年',
                    },
                    {
                        content: '2009年10月“天河1号”超级计算机启用成为当时世界上最快的超级计算机。“天河一号”是中国首台千兆次超级计算机。“天河一号”超级计算机从2008年开始研制，按两期工程实施：一期系统（TH-1）于2009年9月研制成功；二期系统（TH-1A）于2010年8月在国家超级计算天津中心升级完成。',
                        timestamp: '2009年10月',
                        color: '#4399FE',
                    },
                    {
                        content: '2010年2月微软公司正式推出Microsoft Azure。Microsoft Azure 是微软的公用云端服务 (Public Cloud Service) 平台，是微软在线服务 (Microsoft Online Services) 的一部分，自 2008 年开始发展，2010年2月份正式推出，目前全球有54座资料中心以及44个CDN跳跃点 (POP)，并且于2015年时被 Gartner 列为云计算的领先者。 目前 Microsoft Azure 已包含 30 余种服务，数百项功能，并且为微软带来了12亿美元的获利 (2015年度) 。',
                        timestamp: '2010年2月',
                    },
                    {
                        content: '2010年7月Rackspace Hosting和NASA联合推出了OpenStack的源云软件计划。OpenStack是一个免费的 开放标准 云计算平台，主要作为公共服务和私有云中的基础设施即服务（IaaS）部署，用户可以使用虚拟服务器和其他资源。该软件平台由相互关联的组件组成，这些组件控制着整个数据中心内处理，存储和网络资源的多样化，多供应商的硬件池。用户可以通过基于Web的仪表板，命令行工具或RESTful Web服务对其进行管理。',
                        timestamp: '2010年7月',
                        color: '#4399FE',
                    },
                    {
                        content: '2012年10月29日超级计算机泰坦（Titan）正式开始运作。泰坦（Titan）计算机，由美国田纳西州橡树岭国家实验室研制的，采用克雷克雷XK7系统，运算速度每秒可达17.59千万亿次浮点运算。它将主要用于能源、气候变化、 高效引擎、材料及其他科学领域的研究。',
                        timestamp: '2012年10月29日',
                    },
                    {
                        content: '2012年11月日本超级计算机——京正式运行。“京”（日语：京／けい Kei */?、英语：K Computer）是日本富士通与理化学研究所共同开发的超级计算机，位于日本兵库县神户市港湾人工岛上的理化学研究所计算科学研究中心内。名字来源于汉数字单位“京”，即10的16次方。',
                        timestamp: '2012年11月',
                        color: '#4399FE',
                    },
                    {
                        content: '“天河2号”计算机成为2013年全球最快超级计算机。“天河二号”是由国防科学技术大学研制的超级计算机系统，以峰值计算速度每秒5.49京次、持续计算速度每秒3.39京次双精度浮点运算的优异性能位居榜首，成为2013年全球最快超级计算机。',
                        timestamp: '2013年',
                    },
                    {
                        content: '2013年12月10日，Mozilla在全球同步发布了Window, Linux, Mac和Android平台上的Firefox浏览器。',
                        timestamp: '2013年12月10日',
                        color: '#4399FE',
                    },
                    {
                        content: '2014年1月17日三星官方正式发布Galaxy Tab 3 Lite 平板电脑，采用了三星平板的传统设计和较为一般的硬件配置，属于一款物美价廉的经济型平板。',
                        timestamp: '2014年1月17日',
                    },
                    {
                        content: '2016年6月20日“神威·太湖之光”取代“天河二号”登上全球超级计算机500强榜单之首。神威·太湖之光 （英语：Sunway TaihuLight）是由中国国家并行计算机工程技术研究中心研制的超级计算机，2016年6月20日在LINPACK性能测试中以 93 PFLOPS 的测试结果超越同为中国组建的天河二号（LINPACK成绩约为34 PFLOPS），成为当时世界上最快的超级计算机，直到2018年6月8日被美国的超级电脑高峰（Summit）超越。“太湖之光”的命名来源于无锡旁边的太湖。目前神威·太湖之光部署在江苏省无锡市的国家超级计算无锡中心，由清华大学负责运营。',
                        timestamp: '2016年6月20日',
                        color: '#4399FE',
                    },
                    {
                        content: 'Wi-Fi联盟于2018年1月为Wi-Fi引入了WPA3加密，其中包括对WPA2的安全性增强。',
                        timestamp: '2018年1月',
                    },
                    {
                        content: '2018年6月美国超级计算机——Sierra被评为世界上第三快的计算系统。Sierra，代号ATS-2，是IBM为美国能源部下属的劳伦斯利佛摩国家实验室建造的超级电脑，由美国国家核安全局管理，也是该局的第二套“先进技术系统”（Advanced Technology System，ATS），本机组与橡树岭国家实验室的高峰使用几乎相同的架构。在2020年6月公布的TOP500名单中排第三。',
                        timestamp: '2018年6月',
                        color: '#4399FE',
                    },
                    {
                        content: '2018年6月25日Summit获TOP500认证为全球最快的超级电脑。Summit专为美国能源部打造，旨在解决当今时代面临的巨大挑战。它在高精度科学仿真方面可达到200 petaflops的性能，助力最优秀的科学家加速其在高能物理、材料发现、医疗保健等领域的探索。',
                        timestamp: '2018年6月25日',
                    },
                    {
                        content: 'Frontera建于2019年初，并在6月份的两年一度的TOP500排行榜上获得第5名，在高性能LINPACK上实现了23.5 PetaFLOPS（每秒23.5亿次浮点运算）基准测试，衡量系统的计算能力。Frontera主要用于服务于学术界，是现今学术界最快的超级计算机。Frontera系统搭载第二代英特尔至强可扩展处理器和英特尔傲腾数据中心级持久内存，可加快科学研究和创新速度。',
                        timestamp: '2019年',
                        color: '#4399FE',
                    },
                    {
                        content: '2020年2月埃尼公司推出了新的HPC5系统。埃尼公司推出了新的HPC5系统，这是世界上最强大的工业超级计算机。新的超级计算机支持以前的系统(HPC4)，它的计算能力从18增加到52千万亿次/秒，相当于每秒5200亿次数学运算，使埃尼的超级计算生态系统达到70千万亿次/秒的峰值。事实上，HPC5是世界上工业领域最强大的超级计算机基础设施，并使该公司在其数字化进程中达到另一个里程碑。',
                        timestamp: '2020年2月',
                    },
                    {
                        content: '2020年5月NVIDIA推出Ampere GPU架构的时候，公布了一套名为Selene的新型超级计算机，总性能在全球排名第7。Selene现在成为美国最快的工业系统，也是有史以来第二高能效的系统。',
                        timestamp: '2020年5月',
                        color: '#4399FE',
                    },
                    {
                        content: '2020年6月23日日本理化学研究所、九州大学、Fixstars公司、富士通同时公布，在超级计算机的国际性能排名“Graph500”中，“富岳”以每秒41.5万万亿次的运算速度超过美国“顶峰”每秒14.8万万亿次的速度排名世界第一，同时在模拟计算方法、人工智能学习性能、大数据处理性能项目也拿到了第一名，斩获四项第一。',
                        timestamp: '2020年6月23日',
                    },
                    {
                        content: 'Marconi-100超级计算在2020年6月的国际超算大会上排名第九。MARCONI 100（M100）是由意大利CINECA在PPI4HPC欧洲倡议下获得的新型加速集群。MI100 基于具有NVIDIA Volta GPU 的IBM Power9架构，并具有32 Pflops的最高性能。M100于2020年5月提供给欧洲公众和工业研究人员。',
                        timestamp: '2020年6月',
                        color: '#4399FE',
                    },
                    {
                        content: '2020年8月31日华为云推出了 GaussDB (DWS) 实时数仓。在8 月 31 日的华为云 TechWave 大数据专题日上，为了应对企业应用大数据的各种挑战，华为云推出了智能数据湖 FusionInsight，提供采存算管用等数据全生命周期管理解决方案，主要包含 MRS 大数据、GaussDB(DWS)数据仓库、GES 图计算、一站式数据运营平台 DAYU 等。',
                        timestamp: '2020年8月31日',
                    },
                    {
                        content: '2020年9月29日，OPPO广东移动通信有限公司与清华大学正式成立未来终端技术联合研究中心。 未来将围绕人机交互技术、认知计算、计算机视觉、计算摄像学方面的研究工作，与未来终端及可穿戴设备行业应用紧密结合，实现多学科领域的交叉融合，服务国家创新驱动发展战略。',
                        timestamp: '2020年9月29日',
                        color: '#4399FE',
                    },
                    {
                        content: '2020年10月2日，Omdia发布全球5G发展报告，韩国居第一。5G 网络是移动设备的未来，但目前仍处于部署的早期阶段。根据 Omdia 的分析，韩国仍然是 5G 进展的领头羊，瑞士现在是世界第二，超过了科威特。美国排名第四，中国第六。',
                        timestamp: '2020年10月2日',
                    },
                    {
                        content: '2020年10月27日消微软今天宣布，iPad 上的 Word、PowerPoint 和 Excel 应用正在更新，新增 iPadOS 中的触控板和鼠标支持。',
                        timestamp: '2020年10月27日',
                        color: '#4399FE',
                    }
                ],
                imgNum: 1
            }
        },
        methods: {
            updataImg(index) {
                this.imgNum = index + 1;
            }
        }
    }
</script>

<style scoped lang="less">
    .tree-contain {
        display: flex;
        justify-content: space-between;
        height: calc(100vh - 55px);
        overflow: auto;
        .tree {
            padding:3%;
            width: 60%;
        }
        .image {
            position: fixed;
            right:4%;
            top: 50%;
            transform: translateY(-50%);
            object-fit: contain;
            width: 30%;
            border-radius:15px;
            border: 1px solid #999;
        }
    }
</style>
